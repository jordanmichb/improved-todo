import TodoController from './todoController.js';

function createHeader(title) {
    const header = document.createElement('h1');
    header.classList.add('view-header');
    header.textContent = title;

    return header;
}

function createTaskComponent(task) {
    const taskComponent = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDate = document.createElement('p');
    const taskEdit = document.createElement('div');
    const taskDelete = document.createElement('div');

    taskComponent.classList.add('task-component');
    taskTitle.textContent = task.title;
    taskDate.textContent = task.dueDate;

    taskComponent.appendChild(taskTitle);
    taskComponent.appendChild(taskDate);
    taskComponent.appendChild(taskEdit);
    taskComponent.appendChild(taskDelete);

    return taskComponent;
}

function createProjectView(idx) {
    // Get the selected project
    const project = TodoController.getProjects()[idx];

    // Create the view container and header
    const view = document.createElement('div');
    const header = createHeader(project.title);
    const projectDue = document.createElement('span');

    view.id = 'content';
    projectDue.classList.add('project-due-header');
    projectDue.textContent = project.dueDate;

    header.appendChild(projectDue);
    view.appendChild(header);

    for (const task of project.tasks) {
        view.appendChild(createTaskComponent(task));
    }

    return view;
}

function loadProjectView(idx) {
    const content = document.querySelector('#main');
    content.textContent = '';
    content.appendChild(createProjectView(idx));
}

function createTaskView() {
    // Create the view container and header
    const view = document.createElement('div');
    const header = createHeader('All Tasks');

    view.id = 'content';

    view.appendChild(header);


    const projects = TodoController.getProjects();
    for (const project of projects) {
        const projectComponent = document.createElement('div');
        const projectHeader = document.createElement('div');
        const projectTitle = document.createElement('h2');
        const projectDueDate = document.createElement('p');

        projectComponent.classList.add('project-component');
        projectTitle.textContent = project.title;
        projectDueDate.textContent = project.dueDate;

        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectDueDate);
        projectComponent.appendChild(projectHeader);

        for (const task of project.tasks) {
            projectComponent.appendChild(createTaskComponent(task));
        }

        view.appendChild(projectComponent);
    }

    

    return view;
}

function createTodayView() {
    const view = document.createElement('div');
    view.id = 'content';
    const header = document.createElement('h1');
    header.classList.add('view-header');
    header.textContent = 'Today';
    view.appendChild(header);

    return view;
}

function loadTaskView() {
    const content = document.querySelector('#main');
    content.textContent = '';
    content.appendChild(createTaskView());
}

function loadTodayView() {
    const content = document.querySelector('#main');
    content.textContent = '';
    content.appendChild(createTodayView());
}

export { 
    loadProjectView,
    loadTaskView,
    loadTodayView,
};