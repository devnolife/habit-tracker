import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle as SvgCircle } from "react-native-svg";
import { useState } from "react";
import { useThemeContext } from "@/lib/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Task data
const tasks = [
  { id: 1, title: "Review UI mockups", project: "HabitTracker", time: "09:00 - 11:00", completed: true, priority: "high" },
  { id: 2, title: "API integration for prayer times", project: "HabitTracker", time: "11:30 - 13:00", completed: true, priority: "high" },
  { id: 3, title: "Fix expense chart bug", project: "HabitTracker", time: "14:00 - 15:30", completed: false, priority: "medium", isActive: true },
  { id: 4, title: "Write documentation", project: "HabitTracker", time: "16:00 - 17:00", completed: false, priority: "low" },
];

const projectFilters = ["All", "HabitTracker", "Freelance", "Personal"];

// Timer Circle Component
const TimerCircle = ({ progress, size, strokeWidth, timeRemaining, color }: {
  progress: number;
  size: number;
  strokeWidth: number;
  timeRemaining: string;
  color: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`${color}20`}
          strokeWidth={strokeWidth}
        />
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: '800', color: '#111', letterSpacing: -1 }}>{timeRemaining}</Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>Focus Session</Text>
      </View>
    </View>
  );
};

export default function WorkScreen() {
  const { theme } = useThemeContext();
  const [activeFilter, setActiveFilter] = useState("All");
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: '#fef2f2', text: '#dc2626' };
      case 'medium': return { bg: '#fff7ed', text: '#f97316' };
      case 'low': return { bg: '#f0fdf4', text: '#22c55e' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 }}>
            <View>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>Monday, 25 March</Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111' }}>Work Tracker</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ backgroundColor: `${theme.primary}15`, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.primary }} />
                <Text style={{ fontSize: 12, fontWeight: '700', color: theme.primary }}>Focus Mode</Text>
              </View>
              <TouchableOpacity style={[styles.iconButton, { padding: 10, borderRadius: 12, backgroundColor: '#fff' }]}>
                <MaterialCommunityIcons name="cog-outline" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Quick Stats */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 24 }}>
              <View style={[styles.statCard, { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <MaterialCommunityIcons name="clock-outline" size={20} color="#3b82f6" />
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Hours Tracked</Text>
                </View>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#111' }}>6.5 <Text style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}>hrs</Text></Text>
              </View>
              <View style={[styles.statCard, { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color="#22c55e" />
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Tasks Done</Text>
                </View>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#111' }}>8 <Text style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}>/ 12</Text></Text>
              </View>
              <View style={[styles.statCard, { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <MaterialCommunityIcons name="fire" size={20} color="#f97316" />
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Focus Score</Text>
                </View>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#111' }}>85<Text style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}>%</Text></Text>
              </View>
            </View>

            {/* Hero Timer */}
            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <View style={[styles.timerCard, { backgroundColor: '#fff', borderRadius: 24, padding: 32, alignItems: 'center' }]}>
                <TimerCircle
                  progress={65}
                  size={200}
                  strokeWidth={12}
                  timeRemaining="18:32"
                  color={theme.primary}
                />

                {/* Timer Controls */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 32 }}>
                  <TouchableOpacity style={[styles.controlButton, { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }]}>
                    <MaterialCommunityIcons name="restart" size={24} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsTimerRunning(!isTimerRunning)}
                    style={[styles.playButton, { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }]}
                  >
                    <MaterialCommunityIcons name={isTimerRunning ? "pause" : "play"} size={36} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.controlButton, { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }]}>
                    <MaterialCommunityIcons name="skip-next" size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>

                {/* Timer Presets */}
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
                  {[15, 25, 45, 60].map((mins) => (
                    <TouchableOpacity
                      key={mins}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 999,
                        backgroundColor: mins === 25 ? `${theme.primary}15` : '#f3f4f6',
                        borderWidth: mins === 25 ? 1 : 0,
                        borderColor: `${theme.primary}30`
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: '600', color: mins === 25 ? theme.primary : '#6b7280' }}>{mins}m</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Project Filter */}
            <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {projectFilters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 999,
                      backgroundColor: activeFilter === filter ? theme.primary : '#fff',
                      borderWidth: 1,
                      borderColor: activeFilter === filter ? theme.primary : '#e5e7eb',
                      ...(activeFilter === filter ? styles.activeFilterShadow : {})
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '600', color: activeFilter === filter ? '#fff' : '#6b7280' }}>{filter}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Task List */}
            <View style={{ paddingHorizontal: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#111' }}>Today's Tasks</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <MaterialCommunityIcons name="plus" size={18} color={theme.primary} />
                  <Text style={{ fontSize: 14, fontWeight: '700', color: theme.primary }}>Add Task</Text>
                </TouchableOpacity>
              </View>

              {tasks.map((task) => {
                const priorityStyle = getPriorityColor(task.priority);
                return (
                  <View
                    key={task.id}
                    style={[
                      styles.taskCard,
                      {
                        backgroundColor: task.isActive ? `${theme.primary}08` : '#fff',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 12,
                        borderWidth: task.isActive ? 1 : 0,
                        borderColor: `${theme.primary}30`,
                        opacity: task.completed ? 0.6 : 1
                      }
                    ]}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                      <TouchableOpacity style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: task.completed ? theme.primary : '#d1d5db',
                        backgroundColor: task.completed ? theme.primary : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 2
                      }}>
                        {task.completed && <MaterialCommunityIcons name="check" size={14} color="#fff" />}
                      </TouchableOpacity>

                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', textDecorationLine: task.completed ? 'line-through' : 'none' }}>{task.title}</Text>
                          {task.isActive && (
                            <View style={{ backgroundColor: theme.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                              <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>ACTIVE</Text>
                            </View>
                          )}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>{task.project}</Text>
                          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#d1d5db' }} />
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>{task.time}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <View style={{ backgroundColor: priorityStyle.bg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                            <Text style={{ fontSize: 10, fontWeight: '600', color: priorityStyle.text, textTransform: 'uppercase' }}>{task.priority}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Productivity Analytics */}
            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#111' }}>Weekly Analytics</Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: theme.primary }}>Details</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.analyticsCard, { backgroundColor: '#fff', borderRadius: 20, padding: 20 }]}>
                {/* Bar Chart */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, marginBottom: 8 }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const heights = [60, 80, 90, 70, 100, 40, 30];
                    const isToday = day === 'Thu';
                    return (
                      <View key={day} style={{ alignItems: 'center', flex: 1 }}>
                        <View style={{
                          width: 24,
                          height: heights[index],
                          borderRadius: 12,
                          backgroundColor: isToday ? theme.primary : `${theme.primary}30`,
                          marginBottom: 8
                        }} />
                        <Text style={{ fontSize: 10, color: isToday ? theme.primary : '#9ca3af', fontWeight: isToday ? '700' : '500' }}>{day}</Text>
                      </View>
                    );
                  })}
                </View>

                {/* Summary */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f3f4f6' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#111' }}>32.5</Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Total Hours</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#22c55e' }}>+12%</Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>vs Last Week</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#111' }}>4.6h</Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Daily Avg</Text>
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
  iconButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  statCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
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
