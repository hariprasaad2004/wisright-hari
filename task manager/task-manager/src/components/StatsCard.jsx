import { isTaskOverdue } from '../models/taskModel';
import { useTasks } from '../hooks/useTasks';
import '../styles/tasks.css';

/**
 * Reusable single statistic card.
 */
export function StatCard({ label, value, tone = 'blue' }) {
  return (
    <article className={`tm-stat-card tm-stat-card-${tone}`}>
      <p className="tm-stat-label">{label}</p>
      <p className="tm-stat-value">{value}</p>
    </article>
  );
}

/**
 * Displays the four live task statistics cards:
 * Total Tasks, Completed Tasks, Pending Tasks, and Overdue Tasks.
 */
export default function StatsCard() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const overdueTasks = tasks.filter((task) => isTaskOverdue(task)).length;

  const stats = [
    { id: 'total', label: 'Total Tasks', value: totalTasks, tone: 'blue' },
    {
      id: 'completed',
      label: 'Completed Tasks',
      value: completedTasks,
      tone: 'success',
    },
    {
      id: 'pending',
      label: 'Pending Tasks',
      value: pendingTasks,
      tone: 'warning',
    },
    {
      id: 'overdue',
      label: 'Overdue Tasks',
      value: overdueTasks,
      tone: 'danger',
    },
  ];

  return (
    <section className="tm-stats-grid" aria-label="Task statistics">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          tone={stat.tone}
        />
      ))}
    </section>
  );
}
