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

    const editTaskModal = document.querySelector('#edit-task-modal');
    const editTaskForm = document.querySelector('#edit-task-form');
    const editBtnsContainer = document.querySelector('#edit-task-btns');
    const cancelEditTaskBtn = document.querySelector('#cancel-edit-task');
    
    /******************************************************
     * For sidebar task view buttons                      
     ******************************************************/
    allBtn.addEventListener('click', function() { loadView(createTaskView()) });
    todayBtn.addEventListener('click', function() { loadView(createTodayView()) });
    upcomingBtn.addEventListener('click', function() { loadView(createUpcomingView()) });

    /*****************************************************
     * Controls how nav menu appears based on screen size 
     *****************************************************/
    function setNav() {
        const query = window.matchMedia('(max-width: 800px)');
        // On larger screen, remove all styles reserved for smaller screen
        if (!query.matches) {
            menuBtn.classList.remove('active');
            sidebar.classList.remove('open');
        }
    }

    /***********************************************************
     * Toggle menu icon and sidebar expansion on small screen  
     ***********************************************************/
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        sidebar.classList.toggle('expand');
    });

    /******************************************************
     * Load the main content based on view parameter      
     ******************************************************/
    function loadView(view = createTaskView()) {
        const content = document.querySelector('#main');
        content.textContent = '';
        content.appendChild(view);
    }

    /*********************************************
     * Controls for creating a new project       
     *********************************************/

    // Display modal for creating a new project
    createProjectBtn.addEventListener('click', function() {
        projectModal.style.visibility = 'visible';
    });

    // Submit info from modal to create a new project
    addProjectBtn.addEventListener('click', function(e) {
        // Stop page reload
        e.preventDefault();
        const name = document.querySelector('#project-name').value;
        // Input comes as yyyy-mm-dd, format to mm/dd/yyy for display
        const dateInput = document.querySelector('#project-due').value.split('-');
        const dueDate = `${dateInput[1]}/${dateInput[2]}/${dateInput[0]}`;

        TodoController.createProject(name, dueDate);
        projectForm.reset();
        projectModal.style.visibility = 'hidden';
        // Reload project list to include newly added project
        loadProjectList()
    });

    // Cancel creating new project
    cancelProjectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        projectForm.reset();
        projectModal.style.visibility = 'hidden';

    });

    /******************************************************
     * Get all projects and place them into the sidebar   
     ******************************************************/
    function loadProjectList() {
        const projectList = document.querySelector('#project-list');
        const projects = TodoController.getProjects();
        // Remove any previous content
        projectList.textContent = '';

        // For each project, create a functioning button for it and place onto screen
        for (let i = 0; i < projects.length; i++) {
            const button = document.createElement('button');
            button.textContent = projects[i].name;
            button.dataset.project = i;
            // When clicked, that project's page is displayed
            button.addEventListener('click', function(e) {
                loadView(createProjectView(e.target.dataset.project));
            })

            projectList.appendChild(button);
        }
    }

    /*********************************************
     * Controls for creating a new task          
     *********************************************/

    // If add task button is clicked, display modal
    // Event placed on document because this button is not always on scren
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-task'))
            taskModal.style.visibility = 'visible';
    });
    
    // Submit info from modal to create a new task
    addTaskBtn.addEventListener('click', function(e) {
        // Stop page reload
        e.preventDefault();
        const header = document.querySelector('#view-header');
        // Get the current project
        const projectIndex = header.dataset.project;
        const project = TodoController.getProject(projectIndex);
        
        const name = document.querySelector('#task-name').value;
        const desc = document.querySelector('#task-desc').value;
        // Input comes as yyyy-mm-dd, format to mm/dd/yyyy for display
        const dateInput = document.querySelector('#task-due').value.split('-');
        const dueDate = `${dateInput[1]}/${dateInput[2]}/${dateInput[0]}`;
        const priority = document.querySelector('#task-priority').value;

        project.addTask(name, desc, dueDate, priority);
        TodoController.updateStorage();
        taskForm.reset();
        taskModal.style.visibility = 'hidden';
        // Reload project view to display newly added task
        loadView(createProjectView(projectIndex));
    });

    // Cancel creating new task
    cancelTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        taskForm.reset();
        taskModal.style.visibility = 'hidden';

    });

    /*********************************************
     * Controls for editing a task               
     *********************************************/

    // When checkbox is toggled, task is set as complete or incomplete
    function addCompleteTaskEvent(checkbox, task) {
        checkbox.addEventListener('click', function() { 
            task.complete = checkbox.checked ? true : false;
            TodoController.updateStorage();
        });
    };

    // Event is added when edit button is created in pageView.js
    // Each edit button is tied to a specific task so that the task
    // can be worked on directly instead of searching for it in array
    function addEditTaskEvent(editBtn, task) {
        const name = document.querySelector('#edit-task-name');
        const desc = document.querySelector('#edit-task-desc');
        const dueDate = document.querySelector('#edit-task-due');
        const priority = document.querySelector('#edit-task-priority');

        editBtn.addEventListener('click', function() {
            // List of priority options from "select" input
            const priorityOpts = document.querySelectorAll('.pri-optn');
            // split date into [dd, mm, yyyy]
            const date = task.dueDate.split('/');

            // Add task's current info into input fields 
            name.value = task.name;
            desc.value = task.description;
            dueDate.value = `${date[2]}-${date[0]}-${date[1]}`;
            priorityOpts.forEach((op) => {
                if (op.value === task.priority) op.selected = true;
            })

            // Create submit button for each individual task, makes it easier to work
            // on the task directly instead of searching for it in array
            const editTaskSubmit = document.createElement('button');
            editTaskSubmit.id = 'edit-task-submit';
            editTaskSubmit.type = 'submit';
            editTaskSubmit.textContent = 'Edit';
            editTaskSubmit.addEventListener('click', function(e) { submitEditTask(e, task) });

            // Remove any previous task submit buttons and append the new one
            editBtnsContainer.removeChild(editBtnsContainer.lastChild);
            editBtnsContainer.appendChild(editTaskSubmit);

            editTaskModal.style.visibility = 'visible';
        });

        // Submit the task's changes and update in local storage
        function submitEditTask(e, task) {
            //e.preventDefault();
            // Input comes as yyyy-mm-dd, format to mm/dd/yyyy for display
            const date = dueDate.value.split('-');
            const due = `${date[1]}/${date[2]}/${date[0]}`;

            task.editTask(name.value, desc.value, due, priority.value, task.complete);

            TodoController.updateStorage();
            editTaskForm.reset();

            editTaskModal.style.visibility = 'hidden';

            //loadView(createProjectView(projectIndex));
        }
    };

    // Cancel editing task
    cancelEditTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        editTaskForm.reset();
        editTaskModal.style.visibility = 'hidden';

    });

    return {
        addEditTaskEvent,
        addCompleteTaskEvent,
        loadView,
        loadProjectList,
        setNav,
    }
})();

export default ScreenController;