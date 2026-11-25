import { createContext, useCallback, useEffect, useState } from 'react';
import taskService from '../services/taskService';

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext(null);

function getErrorMessage(err, fallbackMessage) {
  return err?.response?.data?.message || err?.message || fallbackMessage;
}

/**
 * Provides task state and CRUD actions to all child components via Context API.
 */
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Loads all tasks from taskService and updates loading/error states.
   */
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load tasks. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialTasks() {
      try {
        const data = await taskService.getAll();
        if (isMounted) {
          setTasks(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            getErrorMessage(err, 'Failed to load tasks. Please try again.')
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Creates a new task and adds it to the top of the list.
   */
  const addTask = useCallback(async (taskData) => {
    setError(null);

    try {
      const createdTask = await taskService.create(taskData);
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
      return createdTask;
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to create task.');
      setError(message);
      throw err;
    }
  }, []);

  /**
   * Updates an existing task's details and syncs React state.
   */
  const updateTask = useCallback(async (id, updatedFields) => {
    setError(null);

    try {
      const savedTask = await taskService.update(id, updatedFields);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? savedTask : task))
      );
      return savedTask;
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to update task.');
      setError(message);
      throw err;
    }
  }, []);

  /**
   * Deletes a task and removes it from React state.
   */
  const deleteTask = useCallback(async (id) => {
    setError(null);

    try {
      await taskService.delete(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to delete task.');
      setError(message);
      throw err;
    }
  }, []);

  /**
   * Toggles a task between completed and pending immediately in UI and storage.
   */
  const toggleTask = useCallback(
    async (id) => {
      const targetTask = tasks.find((task) => task.id === id);
      if (!targetTask) {
        return;
      }

      const nextCompleted = !targetTask.completed;
      setError(null);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: nextCompleted } : task
        )
      );

      try {
        const savedTask = await taskService.update(id, {
          completed: nextCompleted,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? savedTask : task))
        );
      } catch (err) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: targetTask.completed } : task
          )
        );
        const message = getErrorMessage(err, 'Failed to update task status.');
        setError(message);
        throw err;
      }
    },
    [tasks]
  );

  const value = {
    tasks,
    loading,
    error,
    clearError,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
