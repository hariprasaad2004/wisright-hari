import { useEffect, useId, useRef, useState } from 'react';
import { formatDueDate, isTaskOverdue } from '../models/taskModel';
import { useTasks } from '../hooks/useTasks';
import '../styles/tasks.css';

function DeleteConfirmDialog({
  isOpen,
  taskTitle,
  isDeleting,
  onCancel,
  onConfirm,
}) {
  const dialogRef = useRef(null);
  const headingId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="tm-dialog"
      closedby="closerequest"
      aria-labelledby={headingId}
      onClose={onCancel}
    >
      <div className="tm-dialog-header">
        <h1 id={headingId} className="tm-dialog-title">
          Delete Task
        </h1>
        <button
          type="button"
          className="tm-dialog-close"
          onClick={onCancel}
          aria-label="Close confirmation"
          disabled={isDeleting}
        >
          &times;
        </button>
      </div>

      <div className="tm-confirm-body">
        <p>
          Are you sure you want to delete <strong>{taskTitle}</strong>? This
          action cannot be undone.
        </p>
      </div>

      <div className="tm-confirm-actions">
        <button
          type="button"
          className="tm-btn tm-btn-secondary"
          onClick={onCancel}
          disabled={isDeleting}
          autoFocus
        >
          Cancel
        </button>
        <button
          type="button"
          className="tm-btn tm-btn-danger"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </dialog>
  );
}

/**
 * Displays a single task with completion toggle, metadata, Edit, and Delete actions.
 */
export default function TaskCard({ task, onEdit, onSuccess }) {
  const { toggleTask, deleteTask } = useTasks();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const checkboxId = useId();

  const overdue = isTaskOverdue(task);
  const categoryClass = `tm-badge-category-${String(task.category || 'other').toLowerCase()}`;

  async function handleToggle() {
    try {
      await toggleTask(task.id);
    } catch {
      // Context error state captures persistence failures
    }
  }

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      setIsConfirmOpen(false);
      onSuccess?.('Task deleted successfully.');
    } catch {
      setIsConfirmOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <article
        className={`tm-task-card${task.completed ? ' tm-task-card-completed' : ''}`}
      >
        <div className="tm-task-card-top">
          <input
            id={checkboxId}
            type="checkbox"
            className="tm-task-checkbox"
            checked={task.completed}
            onChange={handleToggle}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
          />

          <div className="tm-task-content">
            <div className="tm-task-header-row">
              <h3
                className={`tm-task-title${task.completed ? ' tm-task-title-completed' : ''}`}
              >
                {task.title}
              </h3>

              <span
                className={`tm-badge ${
                  task.completed
                    ? 'tm-badge-status-completed'
                    : 'tm-badge-status-pending'
                }`}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>

            {task.description && (
              <p className="tm-task-description">{task.description}</p>
            )}

            <div className="tm-task-meta">
              <span className={`tm-badge ${categoryClass}`}>
                {task.category}
              </span>

              <span className="tm-due-date">
                Due: {formatDueDate(task.dueDate)}
              </span>

              {overdue && (
                <span className="tm-badge tm-badge-overdue">Overdue</span>
              )}
            </div>
          </div>
        </div>

        <div className="tm-task-actions">
          <button
            type="button"
            className="tm-btn tm-btn-secondary tm-btn-sm"
            onClick={() => onEdit?.(task)}
          >
            Edit
          </button>
          <button
            type="button"
            className="tm-btn tm-btn-outline-danger tm-btn-sm"
            onClick={() => setIsConfirmOpen(true)}
          >
            Delete
          </button>
        </div>
      </article>

      {isConfirmOpen && (
        <DeleteConfirmDialog
          isOpen={isConfirmOpen}
          taskTitle={task.title}
          isDeleting={isDeleting}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
