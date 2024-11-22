import TodoController from './todoController.js';

import edit from './images/edit.png';
import trash from './images/trash.png';
import arrow from './images/arrow.png';

function createHeader(title) {
    const header = document.createElement('h1');
    header.classList.add('view-header');
    header.textContent = title;

    return header;
}

function createTaskComponentExpand() {
    const expanded = document.createElement('div');
    const titleInput = document.createElement('input');

    titleInput.classList.add('edit-title-input')
    expanded.appendChild(titleInput);

    return expanded;
}

function createTaskComponent(task, i) {
    const taskComponent = document.createElement('div');

    const completeLabel = document.createElement('label');
    const taskComplete = document.createElement('input');

    const taskTitle = document.createElement('p');
    const taskDate = document.createElement('p');
    const editBtn = document.createElement('button');
    const editImg = document.createElement('img');
    const deleteBtn = document.createElement('button');
    const deleteImg = document.createElement('img');
    const expandBtn = document.createElement('button');
    //const expandImg = document.createElement('img');
    const expand = document.createElement('input');
    const expandLabel = document.createElement('label');
    const expandImg = document.createElement('img');

    taskComponent.classList.add('task-component');
    completeLabel.classList.add('complete-label');
    taskComplete.classList.add('task-complete');
    editBtn.classList.add('task-btn');
    editImg.classList.add('task-img');
    deleteBtn.classList.add('task-btn');
    deleteImg.classList.add('task-img');
    expandBtn.classList.add('task-btn');
    expandImg.classList.add('task-img');

    completeLabel.setAttribute('for', `task-complete-${i}`);
    taskComplete.type = 'checkbox';
    taskComplete.onclick = function() { 
        task.complete = !task.complete 
        TodoController.updateStorage();
    }
    if (task.complete) { taskComplete.checked = true }

    taskComplete.id = `task-complete-${i}`;
    taskComplete.dataset.task = i;
    taskTitle.textContent = task.title;
    taskDate.textContent = task.dueDate;
    editImg.src = edit;
    deleteImg.src = trash;

    expand.id = `expand-task-${i}`;
    expand.type = 'checkbox';
    expand.classList.add('expand-task');
    expandLabel.setAttribute('for', `expand-task-${i}`);
    expandLabel.classList.add('expand-label');
    expandImg.src = arrow;

    editBtn.appendChild(editImg);
    deleteBtn.appendChild(deleteImg);
    expandLabel.appendChild(expandImg);

    taskComponent.appendChild(taskComplete);
    taskComponent.appendChild(completeLabel);
    taskComponent.appendChild(taskTitle);
    taskComponent.appendChild(taskDate);
    taskComponent.appendChild(editBtn);
    taskComponent.appendChild(deleteBtn);
    taskComponent.appendChild(expand);
    taskComponent.appendChild(expandLabel);
    taskComponent.appendChild(createTaskComponentExpand());

    return taskComponent;
}

function createProjectView(idx) {
    // Get the selected project
    const project = TodoController.getProject(idx);

    // Create the view container and header
    const view = document.createElement('div');
    const header = createHeader(project.title);
    const projectDue = document.createElement('span');
    const btnContainer = document.createElement('div');
    const addTaskBtn = document.createElement('button');

    view.id = 'content';

    projectDue.classList.add('project-due-header');
    btnContainer.classList.add('project-btns');
    addTaskBtn.classList.add('add-task');

    projectDue.textContent = project.dueDate;
    addTaskBtn.textContent = '+ Add task';

    header.appendChild(projectDue);
    btnContainer.appendChild(addTaskBtn);
    view.appendChild(header);
    view.appendChild(btnContainer);

    for (const task of project.tasks) {
        view.appendChild(createTaskComponent(task));
    }

    return view;
}

function createTaskView() {
    // Create the view container and header
    const view = document.createElement('div');
    const header = createHeader('All Tasks');

    view.id = 'content';

    view.appendChild(header);

    const tasks = TodoController.getTasks();

    for (let i = 0; i < tasks.length; i++) {
        view.appendChild(createTaskComponent(tasks[i], i));
    }
    
    /*
    for (const project of projects) {
        const projectComponent = document.createElement('div');
        const projectHeader = document.createElement('div');
        const projectTitle = document.createElement('h2');
        const projectDueDate = document.createElement('p');

        projectComponent.classList.add('project-component');
        projectHeader.classList.add('project-header');
        projectTitle.textContent = project.title;
        projectDueDate.textContent = project.dueDate;

        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectDueDate);
        projectComponent.appendChild(projectHeader);

        for (const task of project.tasks) {
            projectComponent.appendChild(createTaskComponent(task));
        }

        view.appendChild(projectComponent);
    }*/
    return view;
}

function createTodayView() {
    const view = document.createElement('div');
    const header = createHeader('Today');

    view.id = 'content';

    view.appendChild(header);
    
    const tasks = TodoController.getTodayTasks();
    
    for (const task of tasks) {
        view.appendChild(createTaskComponent(task));
    }

    return view;
}

function createUpcomingView() {
    const view = document.createElement('div');
    const header = createHeader('Upcoming');

    view.id = 'content';

    view.appendChild(header);

    const tasks = TodoController.getUpcomingTasks();
    
    for (const task of tasks) {
        view.appendChild(createTaskComponent(task));
    }

    return view;
}

export { 
    createProjectView,
    createTaskView,
    createTodayView,
    createUpcomingView,
};