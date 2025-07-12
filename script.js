let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${idx})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${idx})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

window.toggleTask = function(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  saveTasks();
  renderTasks();
}

window.deleteTask = function(idx) {
  tasks.splice(idx, 1);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

renderTasks();
