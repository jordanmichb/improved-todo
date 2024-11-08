import TodoController from './todoController.js';
import { loadTaskView, loadTodayView } from './taskView.js';
import loadAddProjectModal from './addProject.js';

const ScreenController = (function() {
    const allBtn = document.querySelector('#all');
    const todayBtn = document.querySelector('#today');
    const createProjectBtn = document.querySelector('#create-project');
    const projectModal = document.querySelector('#project-modal');
    const addProjectBtn = document.querySelector('#add-project');
    

    allBtn.addEventListener('click', loadTaskView);
    todayBtn.addEventListener('click', loadTodayView);

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
    })
    
    function loadProjectList() {
        const projectList = document.querySelector('#project-list');
        const projects = TodoController.getProjects();

        for (const project of projects) {
            const button = document.createElement('button');
            button.textContent = project.title;

            projectList.appendChild(button);
        }
    }


    return {
        loadProjectList
    }
})();

export default ScreenController;