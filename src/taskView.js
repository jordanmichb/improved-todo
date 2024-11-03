import TodoController from './todoController.js';

function createTaskView() {
    const view = document.createElement('div');
    view.id = 'content';
    const header = document.createElement('h1');
    header.classList.add('view-header');
    header.textContent = 'All Tasks';
    view.appendChild(header);


    const projects = TodoController.getProjects();
    console.log(projects)

    const projectComponent = document.createElement('div');

    for (const project of projects) {

        
        projectComponent.classList.add('project-component');

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.title;

        const taskComponent = document.createElement('div');

        for (const task of project.tasks) {
            
            const taskTitle = document.createElement('p');
            taskTitle.textContent = task.title;
            taskComponent.appendChild(taskTitle);
        }

        projectComponent.appendChild(projectTitle);
        projectComponent.appendChild(taskComponent);
    }

    view.appendChild(projectComponent);




    

    return view;
}

function loadTaskView() {
    const content = document.querySelector('#main');
    content.textContent = '';
    content.appendChild(createTaskView());
}

export default loadTaskView;