import React, { useState } from 'react';
import { Category } from '../types';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (name: string, color: string) => Category;
  onUpdateCategory: (id: string, updates: Partial<Omit<Category, 'id'>>) => void;
  onDeleteCategory: (id: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryColor, setEditCategoryColor] = useState('');
  
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName('');
      setNewCategoryColor('#3B82F6');
    }
  };
  
  const startEditing = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditCategoryName(category.name);
    setEditCategoryColor(category.color);
  };
  
  const cancelEditing = () => {
    setEditingCategoryId(null);
  };
  
  const handleUpdateCategory = () => {
    if (editingCategoryId && editCategoryName.trim()) {
      onUpdateCategory(editingCategoryId, {
        name: editCategoryName.trim(),
        color: editCategoryColor,
      });
      setEditingCategoryId(null);
    }
  };
  
  // Predefined colors for easy selection
  const colorOptions = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
  ];
  
  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 text-sm flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <span className="mr-1">{isOpen ? 'Hide' : 'Manage'} Categories</span>
        {isOpen ? <X size={16} /> : <Plus size={16} />}
      </button>
      
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Categories</h3>
          
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-grow">
              <label htmlFor="new-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Category
              </label>
              <input
                type="text"
                id="new-category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>
            
            <div>
              <label htmlFor="new-category-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color
              </label>
              <input
                type="color"
                id="new-category-color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="w-10 h-10 rounded border-0 p-0 cursor-pointer"
              />
            </div>
            
            <button
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
              className={`p-2 rounded-md ${
                newCategoryName.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Add category"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="mt-2 space-y-2">
            {categories.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No categories yet</p>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-md"
                >
                  {editingCategoryId === category.id ? (
                    <>
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="flex-grow p-1 mr-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      />
                      <input
                        type="color"
                        value={editCategoryColor}
                        onChange={(e) => setEditCategoryColor(e.target.value)}
                        className="w-8 h-8 mr-2 rounded border-0 p-0 cursor-pointer"
                      />
                      <button
                        onClick={handleUpdateCategory}
                        className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      <span className="flex-grow text-gray-700 dark:text-gray-300">{category.name}</span>
                      <button
                        onClick={() => startEditing(category)}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteCategory(category.id)}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Colors
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    if (editingCategoryId) {
                      setEditCategoryColor(color);
                    } else {
                      setNewCategoryColor(color);
                    }
                  }}
                  aria-label={`Select color ${color}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;