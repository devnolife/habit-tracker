import { View, Text, Pressable } from 'react-native';
import { Card, Checkbox } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Priority = 'high' | 'medium' | 'low';
type TaskCategory = 'personal' | 'deep-work' | 'meetings' | 'admin';

type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: TaskCategory;
  duration: string;
  completed: boolean;
};

const tasks: Task[] = [
  {
    id: '1',
    title: 'Review Q3 financial reports',
    description: 'Analyze and summarize key metrics',
    priority: 'high',
    category: 'deep-work',
    duration: '45 min',
    completed: true
  },
  {
    id: '2',
    title: 'Team sync meeting',
    priority: 'medium',
    category: 'meetings',
    duration: '30 min',
    completed: true
  },
  {
    id: '3',
    title: 'Drafting Q3 Report',
    description: 'Create comprehensive quarterly analysis',
    priority: 'high',
    category: 'deep-work',
    duration: '2 hrs',
    completed: false
  },
  {
    id: '4',
    title: 'Email follow-ups',
    priority: 'low',
    category: 'admin',
    duration: '20 min',
    completed: false
  },
];

const priorityColors = {
  high: { border: 'border-l-red-500', badge: 'bg-red-50 text-red-700' },
  medium: { border: 'border-l-yellow-500', badge: 'bg-yellow-50 text-yellow-700' },
  low: { border: 'border-l-green-500', badge: 'bg-green-50 text-green-700' },
};

const categoryColors = {
  personal: '#a855f7',
  'deep-work': '#2b6cee',
  meetings: '#f97316',
  admin: '#6b7280',
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
};

function TaskItem({ task, onToggle }: TaskItemProps) {
  const priority = priorityColors[task.priority];

  return (
    <Card
      className={`p-4 bg-white mb-3 rounded-2xl shadow-sm border border-transparent border-l-4 ${priority.border}`}
    >
      <View className="flex-row items-start gap-4">
        {/* Checkbox */}
        <Pressable
          onPress={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 items-center justify-center mt-0.5 ${task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300'
            }`}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={14} color="white" />
          )}
        </Pressable>

        {/* Content */}
        <View className="flex-1">
          <Text
            className={`font-semibold ${task.completed ? 'text-muted line-through' : 'text-foreground'
              }`}
          >
            {task.title}
          </Text>
          {task.description && (
            <Text className="text-xs text-muted mt-0.5">{task.description}</Text>
          )}

          {/* Meta */}
          <View className="flex-row items-center gap-2 mt-2">
            <View className={`px-2 py-0.5 rounded ${priority.badge}`}>
              <Text className="text-[10px] font-bold uppercase">{task.priority}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={12} color="#9ca3af" />
              <Text className="text-xs text-muted">{task.duration}</Text>
            </View>
          </View>
        </View>

        {/* Category Indicator */}
        <View
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: categoryColors[task.category] }}
        />
      </View>
    </Card>
  );
}

export function TaskList() {
  const [taskList, setTaskList] = useState(tasks);

  const handleToggle = (id: string) => {
    setTaskList(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  return (
    <View>
      {taskList.map(task => (
        <TaskItem key={task.id} task={task} onToggle={handleToggle} />
      ))}
    </View>
  );
}
