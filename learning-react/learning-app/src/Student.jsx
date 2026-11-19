
function Student(props) {
  const { student, onDelete, onToggle } = props;

  return (
    <div className="student-card">
      <h2>{student.name}</h2>

      <p>Department: {student.department}</p>

      <p>
        Attendance: 
        <strong>{student.status}</strong>
      </p>

      <button onClick={() => onToggle(student.id)}>
        Mark {student.status === "Present" ? "Absent" : "Present"}
      </button>

      <button onClick={() => onDelete(student.id)}>
        Delete
      </button>
    </div>
  );
}

export default Student;
