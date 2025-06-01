import { Task, Category } from '../types';

const TASKS_STORAGE_KEY = 'minimalist-todo-tasks';
const CATEGORIES_STORAGE_KEY = 'minimalist-todo-categories';
const THEME_STORAGE_KEY = 'minimalist-todo-theme';

export const getStoredTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!tasksJson) return [];
  
  try {
    const tasks = JSON.parse(tasksJson);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  } catch (error) {
    console.error('Failed to parse tasks from localStorage', error);
    return [];
  }
};

export const storeTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export const getStoredCategories = (): Category[] => {
  const categoriesJson = localStorage.getItem(CATEGORIES_STORAGE_KEY);
  if (!categoriesJson) {
    // Default categories
    const defaultCategories: Category[] = [
      { id: '1', name: 'Work', color: '#3B82F6' },
      { id: '2', name: 'Personal', color: '#10B981' },
      { id: '3', name: 'Shopping', color: '#F59E0B' },
    ];
    storeCategorories(defaultCategories);
    return defaultCategories;
  }
  
  try {
    return JSON.parse(categoriesJson);
  } catch (error) {
    console.error('Failed to parse categories from localStorage', error);
    return [];
  }
};

export const storeCategorories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
};

export const getStoredTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(THEME_STORAGE_KEY);
  if (theme === 'light' || theme === 'dark') {
    return theme;
  }
  
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export const storeTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};