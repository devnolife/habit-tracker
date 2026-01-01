import { useState, useEffect, useCallback } from 'react';

interface UsePomodoroOptions {
  focusDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  sessionsBeforeLongBreak: number;
  onComplete?: (type: 'focus' | 'short-break' | 'long-break') => void;
}

interface PomodoroState {
  isRunning: boolean;
  isPaused: boolean;
  type: 'focus' | 'short-break' | 'long-break';
  timeRemaining: number; // in seconds
  sessionsCompleted: number;
  totalFocusTime: number; // in seconds
}

export function usePomodoro(options: UsePomodoroOptions) {
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
    onComplete,
  } = options;

  const [state, setState] = useState<PomodoroState>({
    isRunning: false,
    isPaused: false,
    type: 'focus',
    timeRemaining: focusDuration * 60,
    sessionsCompleted: 0,
    totalFocusTime: 0,
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.isRunning && !state.isPaused && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
          totalFocusTime:
            prev.type === 'focus' ? prev.totalFocusTime + 1 : prev.totalFocusTime,
        }));
      }, 1000);
    } else if (state.timeRemaining === 0 && state.isRunning) {
      // Session complete
      onComplete?.(state.type);

      if (state.type === 'focus') {
        const newSessionsCompleted = state.sessionsCompleted + 1;
        const isLongBreak = newSessionsCompleted % sessionsBeforeLongBreak === 0;

        setState((prev) => ({
          ...prev,
          isRunning: false,
          type: isLongBreak ? 'long-break' : 'short-break',
          timeRemaining: (isLongBreak ? longBreakDuration : shortBreakDuration) * 60,
          sessionsCompleted: newSessionsCompleted,
        }));
      } else {
        // Break complete, go back to focus
        setState((prev) => ({
          ...prev,
          isRunning: false,
          type: 'focus',
          timeRemaining: focusDuration * 60,
        }));
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    state.isRunning,
    state.isPaused,
    state.timeRemaining,
    state.type,
    state.sessionsCompleted,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
    onComplete,
  ]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      timeRemaining:
        prev.type === 'focus'
          ? focusDuration * 60
          : prev.type === 'short-break'
            ? shortBreakDuration * 60
            : longBreakDuration * 60,
    }));
  }, [focusDuration, shortBreakDuration, longBreakDuration]);

  const reset = useCallback(() => {
    setState({
      isRunning: false,
      isPaused: false,
      type: 'focus',
      timeRemaining: focusDuration * 60,
      sessionsCompleted: 0,
      totalFocusTime: 0,
    });
  }, [focusDuration]);

  const skip = useCallback(() => {
    if (state.type === 'focus') {
      const isLongBreak = (state.sessionsCompleted + 1) % sessionsBeforeLongBreak === 0;
      setState((prev) => ({
        ...prev,
        isRunning: false,
        type: isLongBreak ? 'long-break' : 'short-break',
        timeRemaining: (isLongBreak ? longBreakDuration : shortBreakDuration) * 60,
        sessionsCompleted: prev.sessionsCompleted + 1,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isRunning: false,
        type: 'focus',
        timeRemaining: focusDuration * 60,
      }));
    }
  }, [
    state.type,
    state.sessionsCompleted,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    sessionsBeforeLongBreak,
  ]);

  // Formatted time
  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  // Progress (0-1)
  const totalDuration =
    state.type === 'focus'
      ? focusDuration * 60
      : state.type === 'short-break'
        ? shortBreakDuration * 60
        : longBreakDuration * 60;
  const progress = 1 - state.timeRemaining / totalDuration;

  return {
    ...state,
    formattedTime,
    progress,
    minutes,
    seconds,
    start,
    pause,
    resume,
    stop,
    reset,
    skip,
  };
}
