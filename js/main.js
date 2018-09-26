const clearButton = document.querySelector('.clear_task');
const taskList = document.querySelector('.collection');
const form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

const loadEventListeners = () => {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click',removeTask);
  clearButton.addEventListener('click',clearTasks);
  filter.addEventListener('keyup', filterTasks);
}


const getTasks = () =>{
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const span = document.createElement('span');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(span);
  });
}

const addTask = (event) =>{
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = '';
  event.preventDefault();
}


const removeTask = (event) => {
  if(event.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure ?')) {
      event.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}


const clearTasks = () => {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}


const clearTasksFromLocalStorage = () => {
  localStorage.clear();
}

const filterTasks = (event) => {
  const elements = event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase.indexOf(elements) != -1 ){
      task.style.display = 'block';
    } else {
      task.style.display ='none';
    }
  })
}


const storeTaskInLocalStorage = (task) => {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const removeTaskFromLocalStorage = (taskItem) =>{
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


loadEventListeners();
