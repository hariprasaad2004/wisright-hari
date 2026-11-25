import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import StatsCard from '../components/StatsCard';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import '../styles/tasks.css';

/**
 * Main Task Management Dashboard page combining header, stats, filters, task list, and modal form.
 */
export default function Tasks() {
  const { user, logout } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3500);

    return () => clearTimeout(timer);
  }, [successMessage]);

  function handleOpenCreate() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleResetFilters() {
    setStatusFilter('all');
    setCategoryFilter('all');
  }

  return (
    <main className="tm-page">
      <div className="tm-container">
        <header className="tm-header">
          <div className="tm-header-copy">
            <h1 className="tm-page-title">My Tasks</h1>
            <p className="tm-page-subtitle">
              Organize your work, track due dates, and stay on top of daily
              priorities.
            </p>
          </div>

          <div className="tm-header-actions">
            {user?.username && (
              <span className="tm-user-pill">
                Signed in as <strong>{user.username}</strong>
              </span>
            )}
            <button
              type="button"
              className="tm-btn tm-btn-primary"
              onClick={handleOpenCreate}
            >
              + Add New Task
            </button>
            <button
              type="button"
              className="tm-btn tm-btn-header-ghost"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </header>

        {successMessage && (
          <div className="tm-success-banner" role="status" aria-live="polite">
            <span>{successMessage}</span>
            <button
              type="button"
              className="tm-success-dismiss"
              onClick={() => setSuccessMessage('')}
              aria-label="Dismiss notification"
            >
              &times;
            </button>
          </div>
        )}

        <StatsCard />

        <TaskFilter
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <TaskList
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onEdit={handleOpenEdit}
          onSuccess={setSuccessMessage}
          onAddNew={handleOpenCreate}
          onResetFilters={handleResetFilters}
        />

        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          initialTask={editingTask}
          onSuccess={setSuccessMessage}
        />
      </div>
    </main>
  );
}
