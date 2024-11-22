import TodoController from './todoController.js';
import { createProjectView, createTaskView, createTodayView, createUpcomingView } from './pageView.js';

const ScreenController = (function() {
    const menuBtn = document.querySelector('#hamburger');
    const sidebar = document.querySelector('#sidebar');

    const allBtn = document.querySelector('#all');
    const todayBtn = document.querySelector('#today');
    const upcomingBtn = document.querySelector('#upcoming');

    const createProjectBtn = document.querySelector('#create-project');
    const projectModal = document.querySelector('#project-modal');
    const projectForm = document.querySelector('#project-form');
    const addProjectBtn = document.querySelector('#add-project');
    const cancelProjectBtn = document.querySelector('#cancel-project');

    const taskModal = document.querySelector('#task-modal');
    const taskForm = document.querySelector('#task-form');
    const addTaskBtn = document.querySelector('#add-task');
    const cancelTaskBtn = document.querySelector('#cancel-task');
    

    allBtn.addEventListener('click', function() { loadView(createTaskView()) });
    todayBtn.addEventListener('click', function() { loadView(createTodayView()) });
    upcomingBtn.addEventListener('click', function() { loadView(createUpcomingView()) });


    function setNav() {
        const query = window.matchMedia('(max-width: 800px)');
        // On larger screen, remove all styles reserved for smaller screen
        if (!query.matches) {
            menuBtn.classList.remove('active');
            sidebar.classList.remove('open');
        }
    }

    function loadView(view = createTaskView()) {
        const content = document.querySelector('#main');
        content.textContent = '';
        content.appendChild(view);
    }

    function loadProjectList() {
        const projectList = document.querySelector('#project-list');
        const projects = TodoController.getProjects();

        projectList.textContent = '';

        for (let i = 0; i < projects.length; i++) {
            const button = document.createElement('button');
            button.textContent = projects[i].title;
            button.dataset.project = i;

            button.addEventListener('click', function(e) {
                loadView(createProjectView(e.target.dataset.project));
            })

            projectList.appendChild(button);
        }
    }

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        sidebar.classList.toggle('expand');
    });

    createProjectBtn.addEventListener('click', function() {
        projectModal.style.visibility = 'visible';
    });
    

    addProjectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.querySelector('#project-name').value;
        // Input comes as yyyy-mm-dd, format to mm/dd/yyy for display
        const dateInput = document.querySelector('#project-due').value.split('-');
        const dueDate = `${dateInput[1]}/${dateInput[2]}/${dateInput[0]}`;

        TodoController.createProject(name, dueDate);
        projectForm.reset();
        projectModal.style.visibility = 'hidden';
        loadView();
        loadProjectList()
    });

    cancelProjectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        projectForm.reset();
        projectModal.style.visibility = 'hidden';

    });

    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-task'))
            taskModal.style.visibility = 'visible';
    });
    
    addTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const header = document.querySelector('#view-header');
        const projectIndex = header.dataset.project;
        const project = TodoController.getProject(projectIndex);
        

        const name = document.querySelector('#task-name').value;
        const desc = document.querySelector('#task-desc').value;
        // Input comes as yyyy-mm-dd, format to mm/dd/yyy for display
        const dateInput = document.querySelector('#task-due').value.split('-');
        const dueDate = `${dateInput[1]}/${dateInput[2]}/${dateInput[0]}`;
        const priority = document.querySelector('#task-priority').value;

        project.addTask(name, desc, dueDate, priority);
        TodoController.updateStorage();
        taskForm.reset();
        taskModal.style.visibility = 'hidden';
        loadView(createProjectView(projectIndex));
    });

    cancelTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        taskForm.reset();
        taskModal.style.visibility = 'hidden';

    });

    return {
        loadView,
        loadProjectList,
        setNav,
    }
})();

export default ScreenController;