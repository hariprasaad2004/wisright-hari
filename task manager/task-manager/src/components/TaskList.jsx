import { useTasks } from '../hooks/useTasks';
import TaskCard from './TaskCard';
import '../styles/tasks.css';

/**
 * Renders the filtered list of TaskCards along with loading, error, and empty states.
 */
export default function TaskList({
  statusFilter = 'all',
  categoryFilter = 'all',
  onEdit,
  onSuccess,
  onAddNew,
  onResetFilters,
}) {
  const { tasks, loading, error, fetchTasks, clearError } = useTasks();

  if (loading) {
    return (
      <div className="tm-state-card" role="status" aria-live="polite">
        <div className="tm-spinner" aria-hidden="true" />
        <p className="tm-state-title">Loading tasks...</p>
        <p className="tm-state-text">
          Fetching your tasks, please wait a moment.
        </p>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="tm-state-card" role="alert">
        <p className="tm-state-title">Unable to load tasks</p>
        <p className="tm-state-text">{error}</p>
        <div className="tm-state-actions">
          <button
            type="button"
            className="tm-btn tm-btn-primary"
            onClick={fetchTasks}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'completed'
          ? task.completed
          : !task.completed;

    const matchesCategory =
      categoryFilter === 'all' ? true : task.category === categoryFilter;

    return matchesStatus && matchesCategory;
  });

  if (filteredTasks.length === 0) {
    const hasActiveFilters = statusFilter !== 'all' || categoryFilter !== 'all';

    return (
      <>
        {error && (
          <div className="tm-inline-error" role="alert">
            <span>{error}</span>
            <button
              type="button"
              className="tm-btn tm-btn-secondary tm-btn-sm"
              onClick={clearError}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="tm-state-card">
          <p className="tm-state-title">No tasks found</p>
          <p className="tm-state-text">
            {hasActiveFilters && tasks.length > 0
              ? 'No tasks match your current filters. Try clearing filters or creating a new task.'
              : 'You do not have any tasks yet. Create one to get started.'}
          </p>
          <div className="tm-state-actions">
            {onAddNew && (
              <button
                type="button"
                className="tm-btn tm-btn-primary"
                onClick={onAddNew}
              >
                Add Your First Task
              </button>
            )}
            {hasActiveFilters && tasks.length > 0 && onResetFilters && (
              <button
                type="button"
                className="tm-btn tm-btn-secondary"
                onClick={onResetFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <section aria-label="Task list">
      {error && (
        <div className="tm-inline-error" role="alert">
          <span>{error}</span>
          <div className="tm-state-actions">
            <button
              type="button"
              className="tm-btn tm-btn-secondary tm-btn-sm"
              onClick={fetchTasks}
            >
              Retry
            </button>
            <button
              type="button"
              className="tm-btn tm-btn-secondary tm-btn-sm"
              onClick={clearError}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="tm-task-grid">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onSuccess={onSuccess}
          />
        ))}
      </div>
    </section>
  );
}
