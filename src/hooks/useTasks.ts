import { useState, useEffect } from 'react';
import { Task, Filter } from '../types';
import { getStoredTasks, storeTasks } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  
  useEffect(() => {
    const storedTasks = getStoredTasks();
    setTasks(storedTasks);
  }, []);
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    return task.completed;
  });
  
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completed: false,
    };
    
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
  };
  
  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
  };
  
  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
  };
  
  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
  };
  
  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    filter,
    setFilter,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    activeTasks: tasks.filter(task => !task.completed).length,
  };
};