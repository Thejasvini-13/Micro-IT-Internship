import React, { useState } from 'react';
import { Priority, Category } from '../types';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: Priority;
    category?: string;
  }) => void;
  categories: Category[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        category: category || undefined
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory(undefined);
      
      // Collapse form after submission if it was expanded
      if (isExpanded) {
        setIsExpanded(false);
      }
    }
  };
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-grow p-2 text-gray-700 dark:text-gray-200 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
            aria-label="Task title"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className={`ml-3 p-2 rounded-md ${
              title.trim() 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            } transition-colors`}
            aria-label="Add task"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 animate-fadeIn">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                placeholder="Add details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category || ''}
                  onChange={(e) => setCategory(e.target.value || undefined)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option value="">None</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;