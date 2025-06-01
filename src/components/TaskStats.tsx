import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface TaskStatsProps {
  total: number;
  completed: number;
  active: number;
}

const TaskStats: React.FC<TaskStatsProps> = ({ total, completed, active }) => {
  // Calculate completion percentage
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: <Clock size={18} className="text-blue-600 dark:text-blue-400" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-800 dark:text-blue-200'
    },
    {
      label: 'Completed',
      value: completed,
      icon: <CheckCircle size={18} className="text-green-600 dark:text-green-400" />,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-800 dark:text-green-200'
    },
    {
      label: 'Active',
      value: active,
      icon: <Circle size={18} className="text-amber-600 dark:text-amber-400" />,
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      textColor: 'text-amber-800 dark:text-amber-200'
    }
  ];
  
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} ${stat.textColor} p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-center mb-2">
              {stat.icon}
              <h3 className="ml-2 font-medium">{stat.label}</h3>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion Progress</h3>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;