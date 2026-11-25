import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <TaskProvider>
      <Tasks />
    </TaskProvider>
  );
}

/**
 * Root application component gating the Task Manager dashboard behind authentication.
 */
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
