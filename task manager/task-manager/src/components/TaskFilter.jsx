import { TASK_CATEGORIES } from '../models/taskModel';
import { useTasks } from '../hooks/useTasks';
import '../styles/tasks.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

/**
 * Filter bar for status (All, Pending, Completed) and categories,
 * displaying dynamic task counts for each option.
 */
export default function TaskFilter({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
}) {
  const { tasks } = useTasks();

  const categoryScopedTasks =
    categoryFilter === 'all'
      ? tasks
      : tasks.filter((task) => task.category === categoryFilter);

  const statusCounts = {
    all: categoryScopedTasks.length,
    pending: categoryScopedTasks.filter((task) => !task.completed).length,
    completed: categoryScopedTasks.filter((task) => task.completed).length,
  };

  const statusScopedTasks = tasks.filter((task) => {
    if (statusFilter === 'pending') return !task.completed;
    if (statusFilter === 'completed') return task.completed;
    return true;
  });

  const matchingCount = statusScopedTasks.filter((task) =>
    categoryFilter === 'all' ? true : task.category === categoryFilter
  ).length;

  return (
    <section className="tm-filter-bar" aria-label="Task filters">
      <div className="tm-filter-row">
        <div className="tm-filter-group" role="group" aria-label="Filter by status">
          <span className="tm-filter-label">Status:</span>
          {STATUS_OPTIONS.map((option) => {
            const isActive = statusFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`tm-filter-btn${isActive ? ' tm-filter-btn-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => onStatusChange(option.value)}
              >
                <span>{option.label}</span>
                <span className="tm-filter-count">
                  {statusCounts[option.value]}
                </span>
              </button>
            );
          })}
        </div>

        <span className="tm-filter-summary">
          Showing {matchingCount} of {tasks.length}{' '}
          {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div className="tm-filter-group" role="group" aria-label="Filter by category">
        <span className="tm-filter-label">Category:</span>
        <button
          type="button"
          className={`tm-filter-btn${categoryFilter === 'all' ? ' tm-filter-btn-active' : ''}`}
          aria-pressed={categoryFilter === 'all'}
          onClick={() => onCategoryChange('all')}
        >
          <span>All</span>
          <span className="tm-filter-count">{statusScopedTasks.length}</span>
        </button>

        {TASK_CATEGORIES.map((category) => {
          const isActive = categoryFilter === category;
          const count = statusScopedTasks.filter(
            (task) => task.category === category
          ).length;

          return (
            <button
              key={category}
              type="button"
              className={`tm-filter-btn${isActive ? ' tm-filter-btn-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onCategoryChange(category)}
            >
              <span>{category}</span>
              <span className="tm-filter-count">{count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
