export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
  category?: string;
}

export type Filter = 'all' | 'active' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string;
}