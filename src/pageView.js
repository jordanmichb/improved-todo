import TodoController from './todoController.js';
import ScreenController from './screenController.js';

import edit from './images/edit.png';
import trash from './images/trash.png';
import arrow from './images/arrow.png';

let viewProject;
let currentView;

/*************************************************
 * Return the function to create the current view   
 * so the correct page can be loaded    
 *************************************************/
function getCurrentView() {
    if (viewProject) { return currentView(viewProject) };
    return currentView();
}

/*************************************
 * Create header for the page        
 *************************************/
function createHeader(title) {
    const header = document.createElement('h1');
    header.id = 'view-header';
    header.classList.add('view-header');
    header.textContent = title;

    return header;
}

/*********************************************************************
 * Create content to be shown when task component is expanded        
 *********************************************************************/
function createTaskComponentExpand(task) {
    const expanded = document.createElement('div');
    const parent = document.createElement('div');
    const description = document.createElement('div');

    expanded.classList.add('expanded-task-content');
    parent.classList.add('task-parent');
    description.classList.add('task-description');

    parent.textContent = `Project: ${task.parentProject.name}`;
    description.textContent = `Description: ${task.description}`;

    expanded.append(parent, description);

    return expanded;
}

/*************************************
 * Create a single task component    
 *************************************/
function createTaskComponent(task, i) {
    const taskComponent = document.createElement('div');
    const priorityTag = document.createElement('div');
    const completeLabel = document.createElement('label');
    const taskComplete = document.createElement('input');
    const taskName = document.createElement('p');
    const taskDate = document.createElement('p');
    const editBtn = document.createElement('button');
    const editImg = document.createElement('img');
    const deleteBtn = document.createElement('button');
    const deleteImg = document.createElement('img');
    const expand = document.createElement('input');
    const expandLabel = document.createElement('label');
    const expandImg = document.createElement('img');

    taskComponent.classList.add('task-component');
    priorityTag.classList.add('priority-tag')
    completeLabel.classList.add('complete-label');
    taskComplete.classList.add('task-complete');
    editBtn.classList.add('task-btn');
    editImg.classList.add('task-img');
    deleteBtn.classList.add('task-btn');
    deleteImg.classList.add('task-img');
    expand.classList.add('expand-task');
    expandLabel.classList.add('expand-label');
    expandImg.classList.add('task-img');

    taskComplete.id = `task-complete-${i}`;
    expand.id = `expand-task-${i}`;

    taskComplete.dataset.task = i;
    taskComplete.type = 'checkbox';
    expand.type = 'checkbox';
    taskName.textContent = task.name;
    taskDate.textContent = task.dueDate
    editImg.src = edit;
    deleteImg.src = trash;
    expandImg.src = arrow;
    
    completeLabel.setAttribute('for', `task-complete-${i}`);
    expandLabel.setAttribute('for', `expand-task-${i}`);
    
    // Event for toggling "complete" checkbox
    ScreenController.addCompleteTaskEvent(taskComplete, task);
    // Event for editing the task
    ScreenController.addEditTaskEvent(editImg, task);
    // Event for deleting the task
    ScreenController.addDeleteTaskEvent(deleteImg, task);
    // Event for expanding the task
    ScreenController.addExpandTaskEvent(expandImg, taskComponent);

    if (task.complete) { taskComplete.checked = true }

    setPriorityColor(priorityTag, task);

    editBtn.appendChild(editImg);
    deleteBtn.appendChild(deleteImg);
    expandLabel.appendChild(expandImg);

    taskComponent.appendChild(priorityTag);
    taskComponent.appendChild(taskComplete);
    taskComponent.appendChild(completeLabel);
    taskComponent.appendChild(taskName);
    taskComponent.appendChild(taskDate);
    taskComponent.appendChild(editBtn);
    taskComponent.appendChild(deleteBtn);
    taskComponent.appendChild(expand);
    taskComponent.appendChild(expandLabel);
    taskComponent.appendChild(createTaskComponentExpand(task));

    return taskComponent;
}

function setPriorityColor(tag, task) {
    if (task.priority === '1') { tag.classList.add('low') }
    else if (task.priority === '2') { tag.classList.add('medium') }
    else if (task.priority === '3') { tag.classList.add('high') }
}

/*************************************************
 * Create page view for a specific project       
 *************************************************/
function createProjectView(project) {
    // Get the selected project
    // Store project reference in add button so it can be referenced later
    const submitAddTask = document.querySelector('#add-task');
    submitAddTask.project = project;

    // Create the view container and header
    const view = document.createElement('div');
    const header = createHeader(project.name);
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

    for (let i = 0; i < project.tasks.length; i++) {
        view.appendChild(createTaskComponent(project.tasks[i], i));
    }

    viewProject = project;
    currentView = createProjectView;
    return view;
}

/*******************************************
 * Create view for showing all tasks       
 *******************************************/
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

    viewProject = undefined;
    currentView = createTaskView;
    return view;
}

/***********************************************
 * Create view for showing today's tasks       
 ***********************************************/
function createTodayView() {
    const view = document.createElement('div');
    const header = createHeader('Today');

    view.id = 'content';

    view.appendChild(header);
    
    const tasks = TodoController.getTodayTasks();
    
    for (let i = 0; i < tasks.length; i++) {
        view.appendChild(createTaskComponent(tasks[i], i));
    }

    viewProject = undefined;
    currentView = createTodayView;
    return view;
}

/***********************************************
 * Create view for showing upcoming tasks       
 ***********************************************/
function createUpcomingView() {
    const view = document.createElement('div');
    const header = createHeader('Upcoming');

    view.id = 'content';

    view.appendChild(header);

    const tasks = TodoController.getUpcomingTasks();
    
    for (let i = 0; i < tasks.length; i++) {
        view.appendChild(createTaskComponent(tasks[i], i));
    }

    viewProject = undefined;
    currentView = createUpcomingView;
    return view;
}

function createCompletedView() {
    const view = document.createElement('div');
    const header = createHeader('Completed');

    view.id = 'content';

    view.append(header);

    const tasks = TodoController.getCompletedasks();

    for (let i = 0; i < tasks.length; i++) {
        view.appendChild(createTaskComponent(tasks[i], i));
    }

    viewProject = undefined;
    currentView = createCompletedView;
    return view;
}

export { 
    getCurrentView,
    createProjectView,
    createTaskView,
    createTodayView,
    createUpcomingView,
    createCompletedView,
};