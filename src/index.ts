import { v4 as uuidV4 } from 'uuid';

const list = document.querySelector<HTMLUListElement>('#list');
const input = document.getElementById(
  'new-task-title',
) as HTMLInputElement | null;
const form = document.querySelector<HTMLFormElement>('#new-task-form');

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const tasks: Task[] = loadTask();
tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) return;

  const task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  addListItem(task);
  tasks.push(task);
  saveTask();
  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', (e) => {
    task.completed = checkbox.checked;
    saveTask();
  });
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem('TASK', JSON.stringify(tasks));
}

function loadTask(): Task[] {
  const taskJSON = localStorage.getItem('TASK');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
