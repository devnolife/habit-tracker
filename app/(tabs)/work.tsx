import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@/lib/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ProgressRing, ScreenHeader, StatCard, SectionHeader, HeaderIconButton, LoadingScreen, EmptyState } from '@/components/ui';
import {
  getWorkSessions,
  getPomodoroState,
  savePomodoroState,
  startSession,
  completeSession,
} from '@/services';
import { getTodayString, formatDate } from '@/lib/utils';
import { APP_CONFIG } from '@/config';
import { TEXT, GRAY } from '@/config/colors';
import type { WorkSession, PomodoroState } from '@/types';

// Task data - will be loaded from service
interface TaskDisplay {
  id: string;
  title: string;
  project: string;
  time: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  isActive?: boolean;
}

const projectFilters = ['Semua', 'HabitTracker', 'Freelance', 'Pribadi'];

export default function WorkScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [pomodoroState, setPomodoroState] = useState<PomodoroState | null>(null);
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const today = getTodayString();

  // Load data from service
  const loadData = useCallback(async () => {
    const [sessionsData, pomState] = await Promise.all([
      getWorkSessions(today),
      getPomodoroState(),
    ]);
    setSessions(sessionsData);
    setPomodoroState(pomState);
    setLoading(false);
  }, [today]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Timer countdown
  useEffect(() => {
    if (pomodoroState?.isRunning && pomodoroState.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setPomodoroState((prev) => {
          if (!prev || prev.timeRemaining <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            const newState = {
              ...prev!,
              isRunning: false,
              timeRemaining: 0,
              sessionsCompleted: prev!.currentSession === 'focus'
                ? prev!.sessionsCompleted + 1
                : prev!.sessionsCompleted,
            };
            savePomodoroState(newState);
            Alert.alert(
              'Sesi Selesai! ✅',
              prev!.currentSession === 'focus'
                ? 'Waktu istirahat!'
                : 'Kembali fokus!',
            );
            return newState;
          }
          const newState = { ...prev, timeRemaining: prev.timeRemaining - 1 };
          return newState;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pomodoroState?.isRunning]);

  const isTimerRunning = pomodoroState?.isRunning ?? false;
  const timeRemaining = pomodoroState?.timeRemaining ?? APP_CONFIG.work.defaultFocusDuration * 60;
  const timerMinutes = Math.floor(timeRemaining / 60);
  const timerSeconds = timeRemaining % 60;
  const currentSessionType = pomodoroState?.currentSession ?? 'focus';
  const totalDuration = currentSessionType === 'focus'
    ? APP_CONFIG.work.defaultFocusDuration * 60
    : currentSessionType === 'break'
      ? APP_CONFIG.work.defaultBreakDuration * 60
      : APP_CONFIG.work.longBreakDuration * 60;
  const timerProgress = totalDuration > 0 ? ((totalDuration - timeRemaining) / totalDuration) * 100 : 0;

  const handleToggleTimer = useCallback(async () => {
    if (!pomodoroState) return;
    const newState = { ...pomodoroState, isRunning: !pomodoroState.isRunning };
    if (!pomodoroState.isRunning && pomodoroState.timeRemaining === 0) {
      // Reset and start new session
      newState.timeRemaining = APP_CONFIG.work.defaultFocusDuration * 60;
      newState.currentSession = 'focus';
      newState.isRunning = true;
    }
    setPomodoroState(newState);
    await savePomodoroState(newState);
    if (newState.isRunning) {
      await startSession(today, newState.currentSession, newState.currentTask);
      const updatedSessions = await getWorkSessions(today);
      setSessions(updatedSessions);
    }
  }, [pomodoroState, today]);

  const handleRestart = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const newState: PomodoroState = {
      isRunning: false,
      currentSession: 'focus',
      timeRemaining: APP_CONFIG.work.defaultFocusDuration * 60,
      sessionsCompleted: pomodoroState?.sessionsCompleted ?? 0,
    };
    setPomodoroState(newState);
    await savePomodoroState(newState);
  }, [pomodoroState]);

  const handleSkip = () => {
    Alert.alert('Lewati Sesi', 'Lanjut ke sesi istirahat?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Ya, Lewati',
        onPress: async () => {
          if (timerRef.current) clearInterval(timerRef.current);
          const nextSession = currentSessionType === 'focus' ? 'break' : 'focus';
          const duration = nextSession === 'focus'
            ? APP_CONFIG.work.defaultFocusDuration
            : APP_CONFIG.work.defaultBreakDuration;
          const newState: PomodoroState = {
            isRunning: false,
            currentSession: nextSession,
            timeRemaining: duration * 60,
            sessionsCompleted: currentSessionType === 'focus'
              ? (pomodoroState?.sessionsCompleted ?? 0) + 1
              : pomodoroState?.sessionsCompleted ?? 0,
          };
          setPomodoroState(newState);
          await savePomodoroState(newState);
        },
      },
    ]);
  };

  const handlePreset = async (mins: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const newState: PomodoroState = {
      isRunning: false,
      currentSession: 'focus',
      timeRemaining: mins * 60,
      sessionsCompleted: pomodoroState?.sessionsCompleted ?? 0,
    };
    setPomodoroState(newState);
    await savePomodoroState(newState);
  };

  // Convert sessions to display tasks
  const tasks: TaskDisplay[] = sessions.map((s) => ({
    id: s.id,
    title: s.task || `Sesi ${s.type === 'focus' ? 'Fokus' : 'Istirahat'}`,
    project: 'HabitTracker',
    time: `${new Date(s.startTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}${s.endTime ? ' - ' + new Date(s.endTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''}`,
    completed: s.completed,
    priority: s.type === 'focus' ? 'high' : 'low',
    isActive: !s.completed && s.type === 'focus',
  }));

  const completedSessions = sessions.filter((s) => s.completed && s.type === 'focus');
  const totalFocusHours = completedSessions.reduce((sum, s) => sum + s.duration, 0) / 60;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const focusScore = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const todayFormatted = formatDate(new Date());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: '#fef2f2', text: '#dc2626' };
      case 'medium':
        return { bg: '#fff7ed', text: '#f97316' };
      case 'low':
        return { bg: '#f0fdf4', text: '#22c55e' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  if (loading) {
    return <LoadingScreen color={theme.primary} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <ScreenHeader
            title="Pelacak Kerja"
            subtitle={todayFormatted.split(',').slice(0, 1).join('')}
            right={
              <>
                <View
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 999,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: theme.primary,
                    }}
                  >
                    Mode Fokus
                  </Text>
                </View>
                <HeaderIconButton icon="cog-outline" onPress={() => router.push('/settings' as any)} />
              </>
            }
          />

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Quick Stats */}
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 24,
                gap: 12,
                marginBottom: 24,
              }}
            >
              <StatCard
                icon="clock-outline"
                iconColor="#3b82f6"
                label="Jam Tercatat"
                value={totalFocusHours.toFixed(1)}
                unit="jam"
              />
              <StatCard
                icon="check-circle-outline"
                iconColor="#22c55e"
                label="Tugas Selesai"
                value={`${completedTasks} / ${tasks.length}`}
              />
              <StatCard
                icon="fire"
                iconColor="#f97316"
                label="Skor Fokus"
                value={focusScore}
                unit="%"
              />
            </View>

            {/* Hero Timer */}
            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <View
                style={[
                  styles.timerCard,
                  {
                    backgroundColor: '#fff',
                    borderRadius: 24,
                    padding: 32,
                    alignItems: 'center',
                  },
                ]}
              >
                <ProgressRing
                  progress={timerProgress}
                  size={200}
                  strokeWidth={12}
                  color={theme.primary}
                  trackOpacity="20"
                >
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 40, fontWeight: '800', color: TEXT.primary, letterSpacing: -1 }}>
                      {`${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`}
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: TEXT.secondary }}>
                      Sesi Fokus
                    </Text>
                  </View>
                </ProgressRing>

                {/* Timer Controls */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 24,
                    marginTop: 32,
                  }}
                >
                  <TouchableOpacity
                    onPress={handleRestart}
                    style={[
                      styles.controlButton,
                      {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#f3f4f6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="restart"
                      size={24}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleToggleTimer}
                    style={[
                      styles.playButton,
                      {
                        width: 72,
                        height: 72,
                        borderRadius: 36,
                        backgroundColor: theme.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={isTimerRunning ? 'pause' : 'play'}
                      size={36}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSkip}
                    style={[
                      styles.controlButton,
                      {
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#f3f4f6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="skip-next"
                      size={24}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>

                {/* Timer Presets */}
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
                  {[15, 25, 45, 60].map((mins) => {
                    const isSelected = Math.ceil(timeRemaining / 60) === mins && !isTimerRunning;
                    return (
                      <TouchableOpacity
                        key={mins}
                        onPress={() => handlePreset(mins)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 999,
                          backgroundColor:
                            isSelected ? `${theme.primary}15` : '#f3f4f6',
                          borderWidth: isSelected ? 1 : 0,
                          borderColor: `${theme.primary}30`,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: isSelected ? theme.primary : '#6b7280',
                          }}
                        >
                          {mins}m
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Project Filter */}
            <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {projectFilters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 999,
                      backgroundColor:
                        activeFilter === filter ? theme.primary : '#fff',
                      borderWidth: 1,
                      borderColor:
                        activeFilter === filter ? theme.primary : '#e5e7eb',
                      ...(activeFilter === filter
                        ? styles.activeFilterShadow
                        : {}),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: activeFilter === filter ? '#fff' : '#6b7280',
                      }}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Task List */}
            <View style={{ paddingHorizontal: 24 }}>
              <SectionHeader
                title="Tugas Hari Ini"
                right={
                  <TouchableOpacity
                    onPress={() => router.push('/work-actions/add-task' as any)}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  >
                    <MaterialCommunityIcons name="plus" size={18} color={theme.primary} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: theme.primary }}>
                      Tambah Tugas
                    </Text>
                  </TouchableOpacity>
                }
              />

              {tasks.length === 0 ? (
                <EmptyState
                  icon="briefcase-outline"
                  title="Belum ada sesi hari ini"
                  subtitle="Mulai timer untuk merekam sesi"
                />
              ) : tasks.map((task) => {
                const priorityStyle = getPriorityColor(task.priority);
                return (
                  <View
                    key={task.id}
                    style={[
                      styles.taskCard,
                      {
                        backgroundColor: task.isActive
                          ? `${theme.primary}08`
                          : '#fff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 12,
                        borderWidth: task.isActive ? 1 : 0,
                        borderColor: `${theme.primary}30`,
                        opacity: task.completed ? 0.6 : 1,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 16,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor: task.completed
                            ? theme.primary
                            : '#d1d5db',
                          backgroundColor: task.completed
                            ? theme.primary
                            : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 2,
                        }}
                      >
                        {task.completed && (
                          <MaterialCommunityIcons
                            name="check"
                            size={14}
                            color="#fff"
                          />
                        )}
                      </TouchableOpacity>

                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: '#111',
                              textDecorationLine: task.completed
                                ? 'line-through'
                                : 'none',
                            }}
                          >
                            {task.title}
                          </Text>
                          {task.isActive && (
                            <View
                              style={{
                                backgroundColor: theme.primary,
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 6,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: '700',
                                  color: '#fff',
                                }}
                              >
                                AKTIF
                              </Text>
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>
                            {task.project}
                          </Text>
                          <View
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: '#d1d5db',
                            }}
                          />
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>
                            {task.time}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: 8,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: priorityStyle.bg,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 4,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: '600',
                                color: priorityStyle.text,
                                textTransform: 'uppercase',
                              }}
                            >
                              {task.priority}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
              }
            </View>

            {/* Productivity Analytics */}
            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <SectionHeader
                title="Analitik Mingguan"
                right={
                  <TouchableOpacity onPress={() => router.push('/work-actions/analytics' as any)}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.primary }}>
                      Detail
                    </Text>
                  </TouchableOpacity>
                }
              />

              <View
                style={[
                  styles.analyticsCard,
                  { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
                ]}
              >
                {/* Bar Chart */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    height: 120,
                    marginBottom: 8,
                  }}
                >
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(
                    (day, index) => {
                      const heights = [60, 80, 90, 70, 100, 40, 30];
                      const isToday = day === 'Kam';
                      return (
                        <View
                          key={day}
                          style={{ alignItems: 'center', flex: 1 }}
                        >
                          <View
                            style={{
                              width: 24,
                              height: heights[index],
                              borderRadius: 12,
                              backgroundColor: isToday
                                ? theme.primary
                                : `${theme.primary}30`,
                              marginBottom: 8,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              color: isToday ? theme.primary : '#9ca3af',
                              fontWeight: isToday ? '700' : '500',
                            }}
                          >
                            {day}
                          </Text>
                        </View>
                      );
                    },
                  )}
                </View>

                {/* Summary */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 16,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderTopColor: '#f3f4f6',
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{ fontSize: 20, fontWeight: '700', color: '#111' }}
                    >
                      32.5
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>
                      Total Jam
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#22c55e',
                      }}
                    >
                      +12%
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>
                      vs Minggu Lalu
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{ fontSize: 20, fontWeight: '700', color: '#111' }}
                    >
                      4.6j
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>
                      Rata-rata Harian
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <ThemeSwitcher />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  timerCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  controlButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  playButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  activeFilterShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  taskCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  analyticsCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
});
