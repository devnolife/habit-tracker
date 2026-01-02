/**
 * 💼 WORK SERVICE
 * ===============
 * Logic untuk fitur work/pomodoro tracker
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WorkSession, SessionType, PomodoroState } from "@/types";
import { APP_CONFIG } from "@/config";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "@work";
const STATE_KEY = "@pomodoro_state";

// Get work sessions for a date
export async function getWorkSessions(date: string): Promise<WorkSession[]> {
  try {
    const data = await AsyncStorage.getItem(`${STORAGE_KEY}_${date}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting work sessions:", error);
    return [];
  }
}

// Save work sessions
export async function saveWorkSessions(date: string, sessions: WorkSession[]): Promise<void> {
  try {
    await AsyncStorage.setItem(`${STORAGE_KEY}_${date}`, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving work sessions:", error);
  }
}

// Start a new session
export async function startSession(
  date: string,
  type: SessionType,
  task?: string
): Promise<WorkSession> {
  const sessions = await getWorkSessions(date);
  const duration = getSessionDuration(type);

  const newSession: WorkSession = {
    id: generateId(),
    type,
    duration,
    startTime: new Date().toISOString(),
    completed: false,
    task,
    date,
  };

  sessions.push(newSession);
  await saveWorkSessions(date, sessions);
  return newSession;
}

// Complete a session
export async function completeSession(date: string, sessionId: string): Promise<WorkSession[]> {
  const sessions = await getWorkSessions(date);
  const updatedSessions = sessions.map((session) => {
    if (session.id === sessionId) {
      return {
        ...session,
        completed: true,
        endTime: new Date().toISOString(),
      };
    }
    return session;
  });

  await saveWorkSessions(date, updatedSessions);
  return updatedSessions;
}

// Get pomodoro state
export async function getPomodoroState(): Promise<PomodoroState> {
  try {
    const data = await AsyncStorage.getItem(STATE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return getDefaultPomodoroState();
  } catch (error) {
    console.error("Error getting pomodoro state:", error);
    return getDefaultPomodoroState();
  }
}

// Save pomodoro state
export async function savePomodoroState(state: PomodoroState): Promise<void> {
  try {
    await AsyncStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving pomodoro state:", error);
  }
}

// Get session duration in minutes
function getSessionDuration(type: SessionType): number {
  switch (type) {
    case "focus":
      return APP_CONFIG.work.defaultFocusDuration;
    case "break":
      return APP_CONFIG.work.defaultBreakDuration;
    case "longBreak":
      return APP_CONFIG.work.longBreakDuration;
    default:
      return APP_CONFIG.work.defaultFocusDuration;
  }
}

// Default pomodoro state
function getDefaultPomodoroState(): PomodoroState {
  return {
    isRunning: false,
    currentSession: "focus",
    timeRemaining: APP_CONFIG.work.defaultFocusDuration * 60,
    sessionsCompleted: 0,
  };
}
