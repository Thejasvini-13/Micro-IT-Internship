import React from 'react';
import { Filter } from '../types';
import { CheckCircle2, Circle, ListFilter } from 'lucide-react';

interface TaskFiltersProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ 
  currentFilter, 
  onFilterChange,
  counts
}) => {
  const filters: { value: Filter; label: string; icon: React.ReactNode }[] = [
    { 
      value: 'all', 
      label: 'All', 
      icon: <ListFilter size={16} className="mr-1.5" /> 
    },
    { 
      value: 'active', 
      label: 'Active', 
      icon: <Circle size={16} className="mr-1.5" /> 
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      icon: <CheckCircle2 size={16} className="mr-1.5" /> 
    },
  ];
  
  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 md:mb-0">
        My Tasks
      </h2>
      
      <div className="flex flex-wrap items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {filters.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`flex items-center px-3 py-1.5 text-sm rounded-md mx-0.5 transition-colors ${
              currentFilter === value
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            aria-current={currentFilter === value ? 'page' : undefined}
            aria-label={`Filter by ${label}`}
          >
            {icon}
            {label}
            <span className="ml-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full px-1.5 py-0.5 min-w-[1.5rem] text-center">
              {counts[value]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;