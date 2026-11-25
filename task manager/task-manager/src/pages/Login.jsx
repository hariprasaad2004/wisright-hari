import { useEffect, useId, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/tasks.css';

function validateField(name, value) {
  if (name === 'username' && !value.trim()) {
    return 'Login ID is required. Please enter your login ID.';
  }
  if (name === 'password' && !value) {
    return 'Password is required. Please enter your password.';
  }
  return '';
}

/**
 * Accessible sign-in page gating access to the Task Manager dashboard.
 */
export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const announceTimerRef = useRef(null);

  const headingId = useId();
  const usernameErrorId = 'login-username-error';
  const passwordErrorId = 'login-password-error';
  const toggleWarningId = 'login-password-toggle-warning';

  useEffect(() => {
    return () => {
      if (announceTimerRef.current) {
        clearTimeout(announceTimerRef.current);
      }
    };
  }, []);

  function scheduleAnnouncement(message) {
    if (announceTimerRef.current) {
      clearTimeout(announceTimerRef.current);
    }
    setLiveAnnouncement('');
    if (!message) {
      return;
    }
    announceTimerRef.current = setTimeout(() => {
      setLiveAnnouncement(message);
    }, 500);
  }

  function handleFieldChange(field, value) {
    if (field === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }

    if (authError) {
      setAuthError('');
    }

    if (errors[field]) {
      const nextError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: nextError }));
      if (!nextError) {
        scheduleAnnouncement('');
      }
    }
  }

  function handleFieldBlur(field, value) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextError = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: nextError }));

    if (nextError) {
      const label = field === 'username' ? 'Login ID' : 'Password';
      scheduleAnnouncement(`${label}: Error: ${nextError}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAuthError('');
    scheduleAnnouncement('');

    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);

    if (usernameError || passwordError) {
      setTouched({ username: true, password: true });
      setErrors({ username: usernameError, password: passwordError });

      if (usernameError) {
        usernameRef.current?.focus();
      } else {
        passwordRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      login(username, password);
    } catch (err) {
      setAuthError(
        err?.message ||
          'Invalid login ID or password. Please check your credentials and try again.'
      );
      passwordRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="tm-login-page">
      <div className="tm-login-card">
        <header className="tm-login-header">
          <p className="tm-login-eyebrow">Task Manager</p>
          <h1 id={headingId} className="tm-login-title">
            Sign in to your workspace
          </h1>
          <p className="tm-login-subtitle">
            Enter your login ID and password to manage your tasks.
          </p>
        </header>

        <form
          className="tm-login-form"
          method="post"
          aria-labelledby={headingId}
          onSubmit={handleSubmit}
          noValidate
        >
          {authError && (
            <div className="tm-form-alert" role="alert">
              {authError}
            </div>
          )}

          <div className="tm-field">
            <label htmlFor="login-username" className="tm-label">
              Login ID
              <span className="tm-required-mark" aria-hidden="true">
                *
              </span>
            </label>
            <input
              ref={usernameRef}
              id="login-username"
              name="username"
              type="text"
              className={`tm-input${
                touched.username && errors.username ? ' tm-input-invalid' : ''
              }`}
              value={username}
              onChange={(event) =>
                handleFieldChange('username', event.target.value)
              }
              onBlur={(event) => handleFieldBlur('username', event.target.value)}
              placeholder="Enter your login ID"
              autoComplete="username"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="next"
              required
              autoFocus
              aria-invalid={errors.username ? 'true' : 'false'}
              aria-describedby={errors.username ? usernameErrorId : undefined}
            />
            {errors.username && (
              <p id={usernameErrorId} className="tm-error-text">
                <span role="img" aria-label="Error">
                  ⚠️
                </span>{' '}
                {errors.username}
              </p>
            )}
          </div>

          <div className="tm-field">
            <label htmlFor="login-password" className="tm-label">
              Password
              <span className="tm-required-mark" aria-hidden="true">
                *
              </span>
            </label>
            <div className="tm-password-row">
              <input
                ref={passwordRef}
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`tm-input${
                  touched.password && errors.password ? ' tm-input-invalid' : ''
                }`}
                value={password}
                onChange={(event) =>
                  handleFieldChange('password', event.target.value)
                }
                onBlur={(event) =>
                  handleFieldBlur('password', event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                enterKeyHint="done"
                required
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? passwordErrorId : undefined}
              />
              <button
                type="button"
                className="tm-btn tm-btn-secondary tm-password-toggle"
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-controls="login-password"
                aria-describedby={toggleWarningId}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <span id={toggleWarningId} className="tm-visually-hidden">
                Warning: this will display your password on the screen.
              </span>
            </div>
            {errors.password && (
              <p id={passwordErrorId} className="tm-error-text">
                <span role="img" aria-label="Error">
                  ⚠️
                </span>{' '}
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="tm-btn tm-btn-primary tm-login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="tm-login-hint">
          Default credentials — Login ID: <code>task</code> · Password:{' '}
          <code>task</code>
        </p>

        <div className="tm-visually-hidden" aria-live="polite">
          {liveAnnouncement}
        </div>
      </div>
    </main>
  );
}
