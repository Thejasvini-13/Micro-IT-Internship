import React, { useState } from 'react';
import { Task, Category } from '../types';
import { Check, Trash2, Edit, Save, X } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  categories: Category[];
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdate,
  categories 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedCategory, setEditedCategory] = useState(task.category);
  
  const category = categories.find(c => c.id === task.category);
  
  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, {
        title: editedTitle,
        description: editedDescription || undefined,
        priority: editedPriority,
        category: editedCategory
      });
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedPriority(task.priority);
    setEditedCategory(task.category);
    setIsEditing(false);
  };
  
  const priorityColors = {
    low: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    medium: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
    high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  };
  
  return (
    <div className={`group mb-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 hover:shadow-md ${
      task.completed ? 'opacity-70' : ''
    }`}>
      {isEditing ? (
        <div className="p-4">
          <div className="mb-3">
            <label htmlFor={`title-${task.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              id={`title-${task.id}`}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              autoFocus
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor={`description-${task.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (optional)
            </label>
            <textarea
              id={`description-${task.id}`}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows={2}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor={`priority-${task.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id={`priority-${task.id}`}
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value as Task['priority'])}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor={`category-${task.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id={`category-${task.id}`}
              value={editedCategory || ''}
              onChange={(e) => setEditedCategory(e.target.value || undefined)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">None</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              disabled={!editedTitle.trim()}
            >
              <Save size={16} className="mr-1" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-start">
            <button
              onClick={() => onToggle(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                task.completed 
                  ? 'bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600' 
                  : 'border-gray-300 dark:border-gray-600'
              } flex items-center justify-center transition-colors duration-200 mr-3 mt-0.5`}
              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed && <Check size={14} className="text-white" />}
            </button>
            
            <div className="flex-grow">
              <div className="flex items-center mb-1">
                <h3 className={`text-base font-medium ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {task.title}
                </h3>
                
                <div className="ml-auto flex items-center">
                  {category && (
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full mr-2"
                      style={{ backgroundColor: `${category.color}30`, color: category.color }}
                    >
                      {category.name}
                    </span>
                  )}
                  
                  <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              </div>
              
              {task.description && (
                <p className={`text-sm ${
                  task.completed ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'
                } mt-1`}>
                  {task.description}
                </p>
              )}
              
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Edit task"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;