const AUTH_STORAGE_KEY = 'task_manager_auth';

/**
 * Default static credentials configured for the local Task Manager login.
 */
export const DEFAULT_CREDENTIALS = {
  username: 'task',
  password: 'task',
};

/**
 * Reads the persisted authentication session from localStorage.
 * Returns null if no valid active session exists.
 */
function getStoredSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (
      parsed?.isAuthenticated === true &&
      typeof parsed?.username === 'string' &&
      parsed.username.trim().length > 0
    ) {
      return {
        username: parsed.username,
        authenticatedAt: parsed.authenticatedAt || null,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Validates credentials against the configured login ID and password,
 * persists session metadata in localStorage, and returns the session user.
 */
function login(username, password) {
  const normalizedUsername = String(username ?? '').trim();
  const normalizedPassword = String(password ?? '');

  if (
    normalizedUsername !== DEFAULT_CREDENTIALS.username ||
    normalizedPassword !== DEFAULT_CREDENTIALS.password
  ) {
    throw new Error(
      'Invalid login ID or password. Please check your credentials and try again.'
    );
  }

  const session = {
    isAuthenticated: true,
    username: normalizedUsername,
    authenticatedAt: new Date().toISOString(),
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

  return {
    username: session.username,
    authenticatedAt: session.authenticatedAt,
  };
}

/**
 * Clears the active authentication session from localStorage.
 */
function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

const authService = {
  getStoredSession,
  login,
  logout,
};

export default authService;
