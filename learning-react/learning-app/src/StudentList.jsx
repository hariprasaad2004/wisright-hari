
import { useState } from "react";
import Student from "./student.jsx";

function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", department: "Computer Science", status: "Absent" },
    { id: 2, name: "Kumar", department: "Information Technology", status: "Present" },
    { id: 3, name: "Priya", department: "Computer Science", status: "Absent" }
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  function handleAddStudent() {
    if (name.trim() === "" || department.trim() === "") {
      alert("Please enter student details");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      department,
      status: "Absent"
    };

    setStudents([...students, newStudent]);
    setName("");
    setDepartment("");
  }

  function handleDelete(id) {
    setStudents(students.filter(student => student.id !== id));
  }

  function handleToggle(id) {
    setStudents(students.map(student =>
      student.id === id
        ? {
            ...student,
            status: student.status === "Present" ? "Absent" : "Present"
          }
        : student
    ));
  }

  const presentCount = students.filter(
    student => student.status === "Present"
  ).length;

  return (
    <div>
      <h1>Student Management System</h1>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Student name"
      />

      <input
        value={department}
        onChange={e => setDepartment(e.target.value)}
        placeholder="Department"
      />

      <button onClick={handleAddStudent}>Add Student</button>

      <h3>Total Students: {students.length}</h3>
      <h3>Present Students: {presentCount}</h3>

      {students.length === 0 ? (
        <p>No students available</p>
      ) : (
        students.map(student => (
          <Student
            key={student.id}
            student={student}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))
      )}
    </div>
  );
}

export default StudentList;
