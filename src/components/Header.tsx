import React from 'react';
import { Sun, Moon, CheckSquare } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-4 mb-6 transition-colors">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <CheckSquare size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">To-Do Ticky </h1>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;