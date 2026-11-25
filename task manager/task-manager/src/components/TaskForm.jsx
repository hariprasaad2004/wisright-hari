import { useEffect, useId, useRef, useState } from 'react';
import { DEFAULT_TASK_VALUES, TASK_CATEGORIES } from '../models/taskModel';
import { useTasks } from '../hooks/useTasks';
import '../styles/tasks.css';

function getInitialValues(initialTask) {
  if (!initialTask) {
    return { ...DEFAULT_TASK_VALUES };
  }

  return {
    title: initialTask.title ?? '',
    description: initialTask.description ?? '',
    category: initialTask.category ?? 'Work',
    dueDate: initialTask.dueDate ?? '',
  };
}

function TaskFormContent({
  headingId,
  initialTask,
  onClose,
  onSuccess,
}) {
  const { addTask, updateTask } = useTasks();
  const isEditMode = Boolean(initialTask);

  const [formValues, setFormValues] = useState(() =>
    getInitialValues(initialTask)
  );
  const [titleError, setTitleError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);

  const titleInputRef = useRef(null);
  const titleId = useId();
  const titleErrorId = useId();
  const descriptionId = useId();
  const categoryId = useId();
  const dueDateId = useId();

  function validateTitle(value) {
    if (!value.trim()) {
      return 'Task title is required. Please enter a title.';
    }
    return '';
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === 'title' && (titleTouched || titleError)) {
      setTitleError(validateTitle(value));
    }
  }

  function handleTitleBlur() {
    setTitleTouched(true);
    setTitleError(validateTitle(formValues.title));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError('');

    const validationMessage = validateTitle(formValues.title);
    if (validationMessage) {
      setTitleTouched(true);
      setTitleError(validationMessage);
      titleInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        category: formValues.category,
        dueDate: formValues.dueDate,
      };

      if (isEditMode) {
        await updateTask(initialTask.id, payload);
        onSuccess?.('Task updated successfully.');
      } else {
        await addTask(payload);
        onSuccess?.('Task created successfully.');
      }

      onClose();
    } catch (err) {
      setSubmitError(
        err?.message || 'Could not save the task. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="tm-dialog-header">
        <h1 id={headingId} className="tm-dialog-title">
          {isEditMode ? 'Edit Task' : 'Add New Task'}
        </h1>
        <button
          type="button"
          className="tm-dialog-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      <form className="tm-form" onSubmit={handleSubmit} noValidate>
        {submitError && (
          <div className="tm-form-alert" role="alert">
            {submitError}
          </div>
        )}

        <div className="tm-field">
          <label htmlFor={titleId} className="tm-label">
            Task Title
            <span className="tm-required-mark" aria-hidden="true">
              *
            </span>
          </label>
          <input
            ref={titleInputRef}
            id={titleId}
            name="title"
            type="text"
            className={`tm-input${titleError ? ' tm-input-invalid' : ''}`}
            value={formValues.title}
            onChange={handleChange}
            onBlur={handleTitleBlur}
            placeholder="e.g., Prepare sprint review slides"
            required
            autoFocus
            aria-invalid={titleError ? 'true' : 'false'}
            aria-describedby={titleError ? titleErrorId : undefined}
          />
          {titleError && (
            <p id={titleErrorId} className="tm-error-text">
              <span role="img" aria-label="Error">
                ⚠️
              </span>{' '}
              {titleError}
            </p>
          )}
        </div>

        <div className="tm-field">
          <label htmlFor={descriptionId} className="tm-label">
            Description
          </label>
          <textarea
            id={descriptionId}
            name="description"
            className="tm-textarea"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Optional notes or details..."
            rows={3}
          />
        </div>

        <div className="tm-field-row">
          <div className="tm-field">
            <label htmlFor={categoryId} className="tm-label">
              Category
            </label>
            <select
              id={categoryId}
              name="category"
              className="tm-select"
              value={formValues.category}
              onChange={handleChange}
            >
              {TASK_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="tm-field">
            <label htmlFor={dueDateId} className="tm-label">
              Due Date
            </label>
            <input
              id={dueDateId}
              name="dueDate"
              type="date"
              className="tm-input"
              value={formValues.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="tm-form-actions">
          <button
            type="button"
            className="tm-btn tm-btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="tm-btn tm-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving...'
              : isEditMode
                ? 'Save Changes'
                : 'Create Task'}
          </button>
        </div>
      </form>
    </>
  );
}

/**
 * Reusable modal form for both creating a new task and editing an existing task.
 */
export default function TaskForm({
  isOpen,
  onClose,
  initialTask = null,
  onSuccess,
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

  // Fallback light-dismiss for browsers without native closedby="any" support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) {
      return;
    }

    let pressedOutside = false;
    const isOutside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };

    const handlePointerDown = (event) => {
      pressedOutside = isOutside(event);
    };

    const handlePointerUp = (event) => {
      if (pressedOutside && isOutside(event)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const formKey = initialTask ? `edit-${initialTask.id}` : 'create-new';

  return (
    <dialog
      ref={dialogRef}
      className="tm-dialog"
      closedby="any"
      aria-labelledby={headingId}
      onClose={onClose}
    >
      {isOpen && (
        <TaskFormContent
          key={formKey}
          headingId={headingId}
          initialTask={initialTask}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </dialog>
  );
}
