import { useState, useEffect } from 'react';
import { Category } from '../types';
import { getStoredCategories, storeCategorories } from '../utils/storage';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const storedCategories = getStoredCategories();
    setCategories(storedCategories);
  }, []);
  
  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    storeCategorories(updatedCategories);
    return newCategory;
  };
  
  const updateCategory = (id: string, updates: Partial<Omit<Category, 'id'>>) => {
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, ...updates } : category
    );
    setCategories(updatedCategories);
    storeCategorories(updatedCategories);
  };
  
  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    storeCategorories(updatedCategories);
  };
  
  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById: (id?: string) => categories.find(category => category.id === id),
  };
};