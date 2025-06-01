import React from 'react';
import { useTasks } from './hooks/useTasks';
import { useCategories } from './hooks/useCategories';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import TaskStats from './components/TaskStats';
import CategoryManager from './components/CategoryManager';
import EmptyState from './components/EmptyState';

function App() {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    updateTask, 
    deleteTask, 
    filter, 
    setFilter,
    totalTasks,
    completedTasks,
    activeTasks 
  } = useTasks();
  
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategories();
  
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto px-4 pb-12 max-w-3xl">
        <TaskForm onAddTask={addTask} categories={categories} />
        
        <TaskStats
          total={totalTasks}
          completed={completedTasks}
          active={activeTasks}
        />
        
        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onUpdateCategory={updateCategory}
          onDeleteCategory={deleteCategory}
        />
        
        <TaskFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{
            all: totalTasks,
            active: activeTasks,
            completed: completedTasks
          }}
        />
        
        {tasks.length > 0 ? (
          <div className="space-y-2">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
                categories={categories}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}
      </main>
    </div>
  );
}

export default App;