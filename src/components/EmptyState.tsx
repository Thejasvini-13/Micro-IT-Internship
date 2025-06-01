import React from 'react';
import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  filter: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  let message = '';
  
  switch (filter) {
    case 'active':
      message = 'No active tasks found';
      break;
    case 'completed':
      message = 'No completed tasks yet';
      break;
    default:
      message = 'No tasks found';
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
      <ClipboardList size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
        {message}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {filter === 'completed' 
          ? 'Start completing tasks to see them here.' 
          : 'Add a new task using the form above to get started.'}
      </p>
    </div>
  );
};

export default EmptyState;