import axios from 'axios';
import { createTask, normalizeTask, TASK_CATEGORIES } from '../models/taskModel';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const STORAGE_KEY = 'task_manager_tasks';
const INITIAL_FETCH_LIMIT = 5;

/**
 * Shared Axios instance configured for the Tasks API.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Reads persisted tasks from localStorage.
 * Returns null if tasks have never been saved yet (first visit).
 */
function readStoredTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeTask) : null;
  } catch {
    return null;
  }
}

/**
 * Saves the task list to localStorage so changes survive page refreshes.
 */
function writeStoredTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Checks if an ID belongs to the seeded JSONPlaceholder range (1..200).
 * Locally created tasks use UUIDs, which JSONPlaceholder does not store.
 */
function isRemoteSeededId(id) {
  return Number.isInteger(id) && id >= 1 && id <= 200;
}

/**
 * Persistence design:
 * - On first load (when localStorage has no saved data), Axios fetches
 *   initial sample tasks from JSONPlaceholder and saves them locally.
 * - All subsequent reads and writes persist in localStorage so created,
 *   edited, completed, and deleted tasks are preserved across refreshes.
 */
const taskService = {
  /**
   * Fetches all tasks (from localStorage, or seeds from JSONPlaceholder on first load).
   */
  async getAll() {
    const storedTasks = readStoredTasks();
    if (storedTasks !== null) {
      return storedTasks;
    }

    const response = await apiClient.get('/todos', {
      params: { _limit: INITIAL_FETCH_LIMIT },
    });

    const seededTasks = response.data.map((todo, index) =>
      normalizeTask({
        id: todo.id,
        title: todo.title,
        description: 'Sample task loaded from API',
        completed: todo.completed,
        category: TASK_CATEGORIES[index % TASK_CATEGORIES.length],
        dueDate: '',
      })
    );

    writeStoredTasks(seededTasks);
    return seededTasks;
  },

  /**
   * Fetches a single task by its unique ID.
   */
  async getById(id) {
    const storedTasks = readStoredTasks();
    if (storedTasks !== null) {
      const localMatch = storedTasks.find((task) => task.id === id);
      if (localMatch) {
        return localMatch;
      }
    }

    if (isRemoteSeededId(id)) {
      const response = await apiClient.get(`/todos/${id}`);
      return normalizeTask(response.data);
    }

    throw new Error(`Task with id "${id}" was not found.`);
  },

  /**
   * Creates a new task via Axios POST and persists it in localStorage.
   */
  async create(taskData) {
    const newTask = createTask(taskData);

    if (!newTask.title) {
      throw new Error('Task title is required.');
    }

    await apiClient.post('/todos', newTask);

    const existingTasks = readStoredTasks() ?? [];
    const updatedList = [newTask, ...existingTasks];
    writeStoredTasks(updatedList);

    return newTask;
  },

  /**
   * Updates an existing task by ID and saves the result to localStorage.
   */
  async update(id, updatedFields) {
    const existingTasks = readStoredTasks() ?? [];
    const existingTask = existingTasks.find((task) => task.id === id);

    if (!existingTask) {
      throw new Error(`Task with id "${id}" was not found.`);
    }

    const updatedTask = createTask({
      ...existingTask,
      ...updatedFields,
      id: existingTask.id,
      createdAt: existingTask.createdAt,
    });

    if (!updatedTask.title) {
      throw new Error('Task title is required.');
    }

    if (isRemoteSeededId(id)) {
      await apiClient.put(`/todos/${id}`, updatedTask);
    }

    const updatedList = existingTasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    writeStoredTasks(updatedList);

    return updatedTask;
  },

  /**
   * Deletes a task by ID and removes it from localStorage.
   */
  async delete(id) {
    const existingTasks = readStoredTasks() ?? [];
    const exists = existingTasks.some((task) => task.id === id);

    if (!exists) {
      throw new Error(`Task with id "${id}" was not found.`);
    }

    if (isRemoteSeededId(id)) {
      await apiClient.delete(`/todos/${id}`);
    }

    const remainingTasks = existingTasks.filter((task) => task.id !== id);
    writeStoredTasks(remainingTasks);

    return id;
  },
};

export default taskService;
