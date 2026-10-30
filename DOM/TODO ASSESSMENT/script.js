
// ======================================
// 1. CONSTANTS AND APPLICATION STATE
// ======================================

const STORAGE_KEY = "todos";

let todos = [];
let currentFilter = "all";
let searchQuery = "";
let draggedTodoId = null;


// ======================================
// 2. DOM ELEMENTS
// ======================================

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dueDateInput = document.getElementById("due-date");
const todoList = document.getElementById("todo-list");
const errorMessage = document.getElementById("error-message");
const emptyMessage = document.getElementById("empty-message");
const searchInput = document.getElementById("search-input");

const totalCount = document.getElementById("total-count");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");
const taskCount = document.getElementById("task-count");

const filterButtons = document.querySelector(".filter-buttons");


// ======================================
// 3. LOAD TODOS FROM LOCAL STORAGE
// ======================================

function loadTodos() {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);

    if (!storedTodos) {
      todos = [];
      return;
    }

    const parsedTodos = JSON.parse(storedTodos);

    if (!Array.isArray(parsedTodos)) {
      throw new Error("Invalid task data");
    }

    // Validate stored task objects
    todos = parsedTodos.filter((todo) => {
      return (
        todo &&
        typeof todo.id === "string" &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean"
      );
    });

  } catch (error) {
    console.error("Unable to load tasks:", error);
    todos = [];
    showMessage("Saved tasks could not be loaded.");
  }
}


// ======================================
// 4. SAVE TODOS TO LOCAL STORAGE
// ======================================

function saveTodos() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(todos)
    );

    return true;

  } catch (error) {
    console.error("Unable to save tasks:", error);
    showMessage("Unable to save tasks. Check browser storage.");
    return false;
  }
}


// ======================================
// 5. SHOW USER MESSAGES
// ======================================

function showMessage(message) {
  errorMessage.textContent = message;
}

function clearMessage() {
  errorMessage.textContent = "";
}


// ======================================
// 6. CREATE TODO ELEMENT
// ======================================

function createTodoElement(todo) {
  const listItem = document.createElement("li");

  listItem.className = "todo-item";
  listItem.dataset.id = todo.id;
  listItem.draggable = true;

  if (todo.completed) {
    listItem.classList.add("completed");
  }

  // Drag handle
  const dragHandle = document.createElement("span");
  dragHandle.className = "drag-handle";
  dragHandle.textContent = "⠿";
  dragHandle.setAttribute("aria-label", "Drag to reorder");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = todo.completed;
  checkbox.dataset.action = "toggle";
  checkbox.setAttribute(
    "aria-label",
    `Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`
  );

  // Task content container
  const content = document.createElement("div");
  content.className = "todo-content";

  const taskText = document.createElement("p");
  taskText.className = "todo-text";
  taskText.textContent = todo.text;

  content.appendChild(taskText);

  // Due date
  if (todo.dueDate) {
    const dateElement = document.createElement("span");
    dateElement.className = "due-date";
    dateElement.textContent = `Due: ${todo.dueDate}`;
    content.appendChild(dateElement);
  }

  // Action buttons
  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "action-btn edit-btn";
  editButton.dataset.action = "edit";
  editButton.textContent = "Edit";
  editButton.setAttribute("aria-label", `Edit ${todo.text}`);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "action-btn delete-btn";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);

  actions.append(editButton, deleteButton);

  listItem.append(
    dragHandle,
    checkbox,
    content,
    actions
  );

  return listItem;
}


// ======================================
// 7. FILTER TODOS
// ======================================

function getFilteredTodos() {
  return todos.filter((todo) => {

    const matchesFilter =
      currentFilter === "all" ||
      (currentFilter === "active" && !todo.completed) ||
      (currentFilter === "completed" && todo.completed);

    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });
}


// ======================================
// 8. UPDATE STATISTICS
// ======================================

function updateStatistics() {
  const total = todos.length;

  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const active = todos.filter(
    (todo) => !todo.completed
  ).length;

  totalCount.textContent = total;
  activeCount.textContent = active;
  completedCount.textContent = completed;
}


// ======================================
// 9. RENDER TODOS TO DOM
// ======================================

function renderTodos() {
  // Clear previous task elements
  todoList.replaceChildren();

  // Get filtered tasks
  const filteredTodos = getFilteredTodos();

  // Create elements using map()
  const todoElements = filteredTodos.map((todo) => {
    return createTodoElement(todo);
  });

  // Batch DOM updates using DocumentFragment
  const fragment = document.createDocumentFragment();

  todoElements.forEach((element) => {
    fragment.appendChild(element);
  });

  todoList.appendChild(fragment);

  // Update empty state
  emptyMessage.classList.toggle(
    "hidden",
    filteredTodos.length > 0
  );

  // Update task count
  taskCount.textContent =
    `${filteredTodos.length} task${filteredTodos.length !== 1 ? "s" : ""}`;

  // Update statistics
  updateStatistics();
}


// ======================================
// 10. ADD NEW TODO
// ======================================

function addTodo(text, dueDate) {
  const trimmedText = text.trim();

  // Input validation
  if (!trimmedText) {
    showMessage("Please enter a task.");
    return;
  }

  // Prevent duplicate task text
  const duplicateTask = todos.find((todo) => {
    return todo.text.toLowerCase() === trimmedText.toLowerCase();
  });

  if (duplicateTask) {
    showMessage("This task already exists.");
    return;
  }

  // Create unique task object
  const newTodo = {
    id: crypto.randomUUID(),
    text: trimmedText,
    completed: false,
    dueDate: dueDate || ""
  };

  // Update state
  todos = [...todos, newTodo];

  // Save and render
  if (saveTodos()) {
    renderTodos();
    clearMessage();
  } else {
    todos = todos.filter((todo) => todo.id !== newTodo.id);
    renderTodos();
  }
}


// ======================================
// 11. TOGGLE TODO COMPLETION
// ======================================

function toggleTodo(id) {
  const existingTodo = todos.find(
    (todo) => todo.id === id
  );

  if (!existingTodo) {
    return;
  }

  // Update task status using map()
  const previousTodos = todos;

  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }

    return todo;
  });

  if (saveTodos()) {
    renderTodos();
  } else {
    todos = previousTodos;
    renderTodos();
  }
}


// ======================================
// 12. DELETE TODO
// ======================================

function deleteTodo(id) {
  const existingTodo = todos.find(
    (todo) => todo.id === id
  );

  if (!existingTodo) {
    return;
  }

  const previousTodos = todos;

  // Remove task using filter()
  todos = todos.filter((todo) => todo.id !== id);

  if (saveTodos()) {
    renderTodos();
    clearMessage();
  } else {
    todos = previousTodos;
    renderTodos();
  }
}


// ======================================
// 13. EDIT TODO
// ======================================

function editTodo(id) {
  const existingTodo = todos.find(
    (todo) => todo.id === id
  );

  if (!existingTodo) {
    return;
  }

  const updatedText = prompt(
    "Edit your task:",
    existingTodo.text
  );

  // Cancelled editing
  if (updatedText === null) {
    return;
  }

  const trimmedText = updatedText.trim();

  if (!trimmedText) {
    showMessage("Task cannot be empty.");
    return;
  }

  const duplicateTask = todos.find((todo) => {
    return (
      todo.id !== id &&
      todo.text.toLowerCase() === trimmedText.toLowerCase()
    );
  });

  if (duplicateTask) {
    showMessage("Another task already has this name.");
    return;
  }

  const previousTodos = todos;

  todos = todos.map((todo) => {
    return todo.id === id
      ? { ...todo, text: trimmedText }
      : todo;
  });

  if (saveTodos()) {
    renderTodos();
    clearMessage();
  } else {
    todos = previousTodos;
    renderTodos();
  }
}


// ======================================
// 14. EVENT DELEGATION - TASK ACTIONS
// ======================================

todoList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton || !todoList.contains(actionButton)) {
    return;
  }

  const listItem = actionButton.closest(".todo-item");

  if (!listItem) {
    return;
  }

  const todoId = listItem.dataset.id;
  const action = actionButton.dataset.action;

  if (action === "delete") {
    deleteTodo(todoId);
  }

  if (action === "edit") {
    editTodo(todoId);
  }
});


// ======================================
// 15. EVENT DELEGATION - CHECKBOX
// ======================================

todoList.addEventListener("change", (event) => {
  if (event.target.dataset.action !== "toggle") {
    return;
  }

  const listItem = event.target.closest(".todo-item");

  if (!listItem) {
    return;
  }

  toggleTodo(listItem.dataset.id);
});


// ======================================
// 16. ADD TASK FORM EVENT
// ======================================

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = todoInput.value;
  const dueDate = dueDateInput.value;

  addTodo(taskText, dueDate);

  // Clear fields after successful addition
  if (!errorMessage.textContent) {
    todoForm.reset();
    todoInput.focus();
  }
});


// ======================================
// 17. FILTER EVENT DELEGATION
// ======================================

filterButtons.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter]");

  if (!filterButton) {
    return;
  }

  currentFilter = filterButton.dataset.filter;

  // Update active filter button
  const allButtons = filterButtons.querySelectorAll(".filter-btn");

  allButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button === filterButton
    );
  });

  renderTodos();
});


// ======================================
// 18. SEARCH FUNCTIONALITY
// ======================================

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value.trim();
  renderTodos();
});


// ======================================
// 19. DRAG AND DROP REORDERING
// ======================================

todoList.addEventListener("dragstart", (event) => {
  const listItem = event.target.closest(".todo-item");

  if (!listItem || !todoList.contains(listItem)) {
    return;
  }

  draggedTodoId = listItem.dataset.id;
  listItem.classList.add("dragging");

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedTodoId);
});

todoList.addEventListener("dragover", (event) => {
  const targetItem = event.target.closest(".todo-item");

  if (!targetItem || !draggedTodoId) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
});

todoList.addEventListener("drop", (event) => {
  const targetItem = event.target.closest(".todo-item");

  if (!targetItem || !draggedTodoId) {
    return;
  }

  event.preventDefault();

  const targetTodoId = targetItem.dataset.id;

  if (draggedTodoId === targetTodoId) {
    return;
  }

  const draggedIndex = todos.findIndex(
    (todo) => todo.id === draggedTodoId
  );

  const targetIndex = todos.findIndex(
    (todo) => todo.id === targetTodoId
  );

  if (draggedIndex === -1 || targetIndex === -1) {
    return;
  }

  const previousTodos = todos;

  // Move task to target position
  const reorderedTodos = [...todos];
  const [movedTodo] = reorderedTodos.splice(draggedIndex, 1);

  reorderedTodos.splice(targetIndex, 0, movedTodo);

  todos = reorderedTodos;

  if (saveTodos()) {
    renderTodos();
  } else {
    todos = previousTodos;
    renderTodos();
  }

  draggedTodoId = null;
});

todoList.addEventListener("dragend", () => {
  draggedTodoId = null;

  const draggingItem = todoList.querySelector(".dragging");

  if (draggingItem) {
    draggingItem.classList.remove("dragging");
  }
});


// ======================================
// 20. INITIALIZE APPLICATION
// ======================================

function init() {
  loadTodos();
  renderTodos();

  console.log("To-Do application initialized successfully!");
}

// Start application
init();

