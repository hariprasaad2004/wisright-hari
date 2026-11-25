/**
 * Valid categories available for every task.
 */
export const TASK_CATEGORIES = ['Work', 'Personal', 'Learning', 'Other'];

/**
 * Default values used when initializing a new task form.
 */
export const DEFAULT_TASK_VALUES = {
  title: '',
  description: '',
  completed: false,
  category: 'Work',
  dueDate: '',
};

/**
 * Generates a unique identifier for a new task.
 * Uses crypto.randomUUID when available, with a timestamp fallback.
 */
function generateTaskId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Creates a standardized task object following the Task Data Model.
 *
 * @param {Object} taskInput - Input fields for the task.
 * @returns {Object} A complete task object.
 */
export function createTask(taskInput = {}) {
  const category = TASK_CATEGORIES.includes(taskInput.category)
    ? taskInput.category
    : 'Other';

  return {
    id: taskInput.id ?? generateTaskId(),
    title: String(taskInput.title ?? '').trim(),
    description: String(taskInput.description ?? '').trim(),
    completed: Boolean(taskInput.completed),
    category,
    dueDate: taskInput.dueDate || '',
    createdAt: taskInput.createdAt || new Date().toISOString(),
  };
}

/**
 * Normalizes an existing or external API task object into our Task Data Model.
 *
 * @param {Object} rawTask - Raw task object from an API or storage.
 * @returns {Object} Normalized task object.
 */
export function normalizeTask(rawTask = {}) {
  return createTask({
    id: rawTask.id,
    title: rawTask.title,
    description: rawTask.description ?? '',
    completed: rawTask.completed ?? false,
    category: rawTask.category ?? 'Work',
    dueDate: rawTask.dueDate ?? '',
    createdAt: rawTask.createdAt ?? new Date().toISOString(),
  });
}

/**
 * Checks whether a pending task's calendar due date is before today without UTC drift.
 *
 * @param {Object} task - Task object.
 * @returns {boolean} True when incomplete and dueDate is strictly in the past.
 */
export function isTaskOverdue(task) {
  if (!task?.dueDate || task.completed) {
    return false;
  }

  if (typeof Temporal !== 'undefined') {
    try {
      const due = Temporal.PlainDate.from(task.dueDate);
      const today = Temporal.Now.plainDateISO();
      return Temporal.PlainDate.compare(due, today) < 0;
    } catch {
      return false;
    }
  }

  const parts = String(task.dueDate).split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return false;
  }

  const [year, month, day] = parts;
  const dueLocal = new Date(year, month - 1, day);
  const now = new Date();
  const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return dueLocal < todayLocal;
}

/**
 * Formats a YYYY-MM-DD due date into a readable calendar date without timezone shift.
 *
 * @param {string} dueDate - ISO date string (YYYY-MM-DD).
 * @returns {string} Formatted date label.
 */
export function formatDueDate(dueDate) {
  if (!dueDate) {
    return 'No due date';
  }

  if (typeof Temporal !== 'undefined') {
    try {
      return Temporal.PlainDate.from(dueDate).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dueDate;
    }
  }

  const parts = String(dueDate).split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return dueDate;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
