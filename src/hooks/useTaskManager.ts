import { useState, useCallback } from 'react';
import { generateId } from '../utils/formatters';
import type { Task, TaskPriority, TaskCategory } from '../types';

interface UseTaskManagerOptions {
  initialTasks?: Task[];
}

export function useTaskManager(options: UseTaskManagerOptions = {}) {
  const [tasks, setTasks] = useState<Task[]>(options.initialTasks || []);

  const addTask = useCallback(
    (task: Omit<Task, 'id' | 'completed'>) => {
      const newTask: Task = {
        ...task,
        id: generateId(),
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    },
    []
  );

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const getTasksByDate = useCallback(
    (date: string) => {
      return tasks.filter((task) => task.date === date);
    },
    [tasks]
  );

  const getTasksByCategory = useCallback(
    (category: TaskCategory) => {
      return tasks.filter((task) => task.category === category);
    },
    [tasks]
  );

  const getTasksByPriority = useCallback(
    (priority: TaskPriority) => {
      return tasks.filter((task) => task.priority === priority);
    },
    [tasks]
  );

  const getPendingTasks = useCallback(() => {
    return tasks.filter((task) => !task.completed);
  }, [tasks]);

  const getCompletedTasks = useCallback(() => {
    return tasks.filter((task) => task.completed);
  }, [tasks]);

  const getTaskStats = useCallback(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      completionRate,
    };
  }, [tasks]);

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getTasksByDate,
    getTasksByCategory,
    getTasksByPriority,
    getPendingTasks,
    getCompletedTasks,
    getTaskStats,
  };
}
