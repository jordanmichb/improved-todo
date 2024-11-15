import TodoController from './todoController.js';
import { createProjectView, createTaskView, createTodayView, createUpcomingView } from './pageView.js';

const ScreenController = (function() {
    const allBtn = document.querySelector('#all');
    const todayBtn = document.querySelector('#today');
    const upcomingBtn = document.querySelector('#upcoming');
    const createProjectBtn = document.querySelector('#create-project');
    const projectModal = document.querySelector('#project-modal');
    const projectForm = document.querySelector('#project-form');
    const addProjectBtn = document.querySelector('#add-project');
    const cancelProjectBtn = document.querySelector('#cancel-project');
    

    allBtn.addEventListener('click', function() { loadView(createTaskView()) });
    todayBtn.addEventListener('click', function() { loadView(createTodayView()) });
    upcomingBtn.addEventListener('click', function() { loadView(createUpcomingView()) });




    createProjectBtn.addEventListener('click', function() {
        projectModal.style.visibility = 'visible';
    });

    addProjectBtn.addEventListener('click', function() {
        const name = document.querySelector('#project-name').value;
        // Input comes as yyyy-mm-dd, format to mm/dd/yyy for display
        const dateInput = document.querySelector('#project-due').value.split('-');
        const dueDate = `${dateInput[1]}/${dateInput[2]}/${dateInput[0]}`;

        TodoController.createProject(name, dueDate);

        //projectModal.style.visibility = 'hidden';
    });

    cancelProjectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        projectForm.reset();
        projectModal.style.visibility = 'hidden';

    });
    

    function loadView(view = createTaskView()) {
        const content = document.querySelector('#main');
        content.textContent = '';
        content.appendChild(view);
    }

    function loadProjectList() {
        const projectList = document.querySelector('#project-list');
        const projects = TodoController.getProjects();

        for (let i = 0; i < projects.length; i++) {
            const button = document.createElement('button');
            button.textContent = projects[i].title;
            button.dataset.project = i;

            button.addEventListener('click', function(e) {
                loadView(createProjectView(e.target.dataset.project))
                //loadProjectView(e.target.dataset.project);
            })

            projectList.appendChild(button);
        }
    }


    return {
        loadView,
        loadProjectList,
    }
})();

export default ScreenController;