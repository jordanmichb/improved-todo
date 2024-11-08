import TodoController from './todoController.js';

function createTaskView() {
    const view = document.createElement('div');
    const header = document.createElement('h1');

    const projects = TodoController.getProjects();

    view.id = 'content';
    
    header.classList.add('view-header');
    header.textContent = 'All Tasks';

    view.appendChild(header);

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

            projectComponent.appendChild(taskComponent);
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
    loadTaskView,
    loadTodayView
};