import TodoController from './todoController.js';
import { getCurrentView, createProjectView, createTaskView, createTodayView, createUpcomingView, createCompletedView } from './pageView.js';
import { validateAddProject, validateAddTask, validateEditTask } from './formValidator.js';

const ScreenController = (function() {
    const main = document.querySelector('#main');

    /******************************************************
     * For sidebar task view buttons                      
     ******************************************************/
    const allBtn = document.querySelector('#all');
    const todayBtn = document.querySelector('#today');
    const upcomingBtn = document.querySelector('#upcoming');
    const completedBtn = document.querySelector('#completed');

    allBtn.addEventListener('click', function() { loadView(createTaskView()) });
    todayBtn.addEventListener('click', function() { loadView(createTodayView()) });
    upcomingBtn.addEventListener('click', function() { loadView(createUpcomingView()) });
    completedBtn.addEventListener('click', function() { loadView(createCompletedView()) });



    /******************************************************
     * Load the main content based on view parameter      
     ******************************************************/
    function loadView(view = createTaskView()) {
        main.textContent = '';
        main.appendChild(view);
    }



    /*****************************************************
     * Controls main's height based on screen size since 
     * it can't be known how many tasks there are and if they'll
     * overflow. 
     *****************************************************/
    function setContentHeight() {
        const height = window.innerHeight;
        // If window is below min height, set to auto so main will
        // fill remaining space or contain tasks list, whichever is larger.
        // If tasks list (scroll height) overflows main (client height) when
        // window iss above min height, set to auto to contain tasks/
        if (height < 600 || main.scrollHeight >= main.clientHeight) {
            main.style.height = 'auto';
        }
        // If window height is greater than main height, stretch main to fit
        if (height > main.clientHeight) {
            main.style.height = '100vh';
        }
    }

    // Properly set height when screen is resized
    window.addEventListener('resize', setContentHeight);



    /*****************************************************
     * Controls for hamburber icon and sidebar 
     *****************************************************/
    const menuBtn = document.querySelector('#hamburger');
    const sidebar = document.querySelector('#sidebar');

    // Controls how nav menu appears based on screen size
    function setNav() {
        const query = window.matchMedia('(max-width: 800px)');
        // On larger screen, remove all styles reserved for smaller screen
        if (!query.matches) {
            menuBtn.classList.remove('active');
            sidebar.classList.remove('expand');
        }
    }
    // Properly set nav styles when screen is resized
    window.addEventListener('resize', setNav);

    // Toggle menu icon and sidebar expansion on small screen
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        sidebar.classList.toggle('expand');
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
            // Store project reference in button so it can be referenced later
            button.project = projects[i];
            // When clicked, that project's page is displayed
            button.addEventListener('click', function(e) {
                loadView(createProjectView(e.target.project));
            })

            projectList.appendChild(button);
        }
    }



    /*********************************************
     * Controls for creating a new project       
     *********************************************/
    const createProjectBtn = document.querySelector('#create-project');
    const projectModal = document.querySelector('#project-modal');
    const projectForm = document.querySelector('#project-form');
    const addProjectBtn = document.querySelector('#add-project');
    const cancelProjectBtn = document.querySelector('#cancel-project');

    const addProjectName = document.querySelector('#project-name');
    
    // Set styles for invalid form
    addProjectBtn.addEventListener('click', function() {
        if (addProjectName.value === '') { addProjectName.classList.add('invalid') }
        else { addProjectName.classList.remove('invalid') }
    });

    addProjectName.addEventListener('input', function() {
        if (addProjectName.value !== '') { addProjectName.classList.remove('invalid') }
    });

    // Display modal for creating a new project
    createProjectBtn.addEventListener('click', function() {
        projectModal.style.visibility = 'visible';
    });

    // Submit info from modal to create a new project
    addProjectBtn.addEventListener('click', function(e) {
        // Stop page reload
        e.preventDefault();
        if (!validateAddProject()) return;

        const name = addProjectName.value;
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



    /*********************************************
     * Controls for creating a new task          
     *********************************************/
    const taskModal = document.querySelector('#add-task-modal');
    const addTaskForm = document.querySelector('#add-task-form');
    const submitAddTask = document.querySelector('#add-task');
    const cancelTaskBtn = document.querySelector('#cancel-task');

    const addName = document.querySelector('#task-name');
    const addDue = document.querySelector('#task-due');

    // Set styles for invalid form
    submitAddTask.addEventListener('click', function() {
        if (addName.value === '') { addName.classList.add('invalid') }
        else { addName.classList.remove('invalid') }
        if (addDue.value === '') { addDue.classList.add('invalid') }
        else { addDue.classList.remove('invalid') }
    });

    addName.addEventListener('input', function() {
        if (addName.value !== '') { addName.classList.remove('invalid') }
    });

    addDue.addEventListener('input', function() {
        if (addDue.value !== '') { addDue.classList.remove('invalid') }
    });

    // If add task button is clicked, display modal
    // Event placed on document because this button is not always on scren
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-task'))
            taskModal.style.visibility = 'visible';
    });
    
    // Submit info from modal to create a new task
    submitAddTask.addEventListener('click', function(e) {
        // Stop page reload
        e.preventDefault();
        if (!validateAddTask()) return;

        const header = document.querySelector('#view-header');
        // Get the current project sored in button
        const project = submitAddTask.project;
        
        const name = addName.value;
        const desc = document.querySelector('#task-desc').value;
        // Input comes as yyyy-mm-dd, format to mm/dd/yyyy for display
        const dateInput = addDue.value.split('-');
        const dueDate = `${dateInput[1]}/${dateInput[2]}/${dateInput[0]}`;
        const priority = document.querySelector('#task-priority').value;

        project.addTask(name, desc, dueDate, priority);
        // Update list of today or upcoming tasks
        TodoController.updateTasks();
        TodoController.updateStorage();
        addTaskForm.reset();
        taskModal.style.visibility = 'hidden';

        // Reload project view to display newly added task
        loadView(getCurrentView());
    });

    // Cancel creating new task
    cancelTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addTaskForm.reset();
        taskModal.style.visibility = 'hidden';
    });



    /*********************************************
     * Controls for editing a task               
     *********************************************/
    const editTaskModal = document.querySelector('#edit-task-modal');
    const editTaskForm = document.querySelector('#edit-task-form');
    const editBtnsContainer = document.querySelector('#edit-task-btns');
    const cancelEditTaskBtn = document.querySelector('#cancel-edit-task');

    const editName = document.querySelector('#edit-task-name');
    const editDesc = document.querySelector('#edit-task-desc');
    const editDue = document.querySelector('#edit-task-due');
    const editPriority = document.querySelector('#edit-task-priority');

    // Set styles for invalid form
    editName.addEventListener('input', function() {
        if (editName.value === '') { editName.classList.add('invalid') }
        else { editName.classList.remove('invalid') }
    });

    editDue.addEventListener('input', function() {
        if (editDue.value === '') { editDue.classList.add('invalid') }
        else { editDue.classList.remove('invalid') }
    });

    // When checkbox is toggled, task is set as complete or incomplete
    function addCompleteTaskEvent(checkbox, task) {
        checkbox.addEventListener('click', function() { 
            task.complete = checkbox.checked ? true : false;
            TodoController.setCompletedTasks();
            TodoController.updateStorage();
        });
    };

    // Event is added when edit button is created in pageView.js
    // Each edit button is tied to a specific task so that the task
    // can be worked on directly instead of searching for it in array
    function addEditTaskEvent(editBtn, task) {
        /*const name = document.querySelector('#edit-task-name');
        const desc = document.querySelector('#edit-task-desc');
        const dueDate = document.querySelector('#edit-task-due');
        const priority = document.querySelector('#edit-task-priority');*/

        editBtn.addEventListener('click', function() {
            // List of priority options from "select" input
            const priorityOpts = document.querySelectorAll('.pri-optn');
            // split date into [dd, mm, yyyy]
            const date = task.dueDate.split('/');

            // Add task's current info into input fields 
            editName.value = task.name;
            editDesc.value = task.description;
            editDue.value = `${date[2]}-${date[0]}-${date[1]}`;
            priorityOpts.forEach((op) => {
                if (op.value === task.priority) op.selected = true;
            })

            // Create submit button for each individual task, makes it easier to work
            // on the task directly instead of searching for it in array
            const editTaskSubmit = document.createElement('button');
            editTaskSubmit.id = 'edit-task-submit';
            editTaskSubmit.type = 'submit';
            editTaskSubmit.textContent = 'Save';
            editTaskSubmit.addEventListener('click', function(e) { submitEditTask(e, task) });

            // Create delete button for each task
            const deleteTaskBtn = document.createElement('button');
            deleteTaskBtn.id = 'delete-task';
            deleteTaskBtn.textContent = 'Delete';
            deleteTaskBtn.addEventListener('click', function(e) { showDeleteModal(e, task) });

            // Remove any previous task submit buttons and append the new one
            editBtnsContainer.removeChild(editBtnsContainer.firstChild);
            editBtnsContainer.prepend(deleteTaskBtn);
            editBtnsContainer.removeChild(editBtnsContainer.lastChild);
            editBtnsContainer.appendChild(editTaskSubmit);
            

            editTaskModal.style.visibility = 'visible';
        });

        // Submit the task's changes and update in local storage
        function submitEditTask(e, task) {
            e.preventDefault();
            if (!validateEditTask()) return;
            
            // Input comes as yyyy-mm-dd, format to mm/dd/yyyy for display
            const date = editDue.value.split('-');
            const due = `${date[1]}/${date[2]}/${date[0]}`;

            task.editTask(editName.value, editDesc.value, due, editPriority.value, task.complete);

            // Update list of today or upcoming tasks
            TodoController.updateTasks();
            TodoController.updateStorage();
            editTaskForm.reset();

            editTaskModal.style.visibility = 'hidden';

            loadView(getCurrentView());
        }

        function showDeleteModal(e, task) {
            e.preventDefault();
            
            const delTaskModal = document.querySelector('#del-task-modal');
            const delBtnsContainer = document.querySelector('#del-task-btns');
            const cancelDelTaskBtn = document.querySelector('#cancel-del-task');

            const delTaskSubmit = document.createElement('button');
            delTaskSubmit.id = 'del-task-submit';
            delTaskSubmit.textContent = 'Delete';
            delTaskSubmit.addEventListener('click', function(e) { submitDeleteTask(e, task) });

            // Remove any previous task delete buttons and append the new one
            delBtnsContainer.removeChild(delBtnsContainer.lastChild);
            delBtnsContainer.appendChild(delTaskSubmit);

            delTaskModal.style.visibility = 'visible';
            /*
            const taskId = task.id;
            const project = task.parentProject;

            project.deleteTask(taskId);

            TodoController.setCompletedTasks();
            TodoController.updateTasks();
            TodoController.updateStorage();

            delTaskModal.style.visibility = 'hidden';

            loadView(getCurrentView());
            */
        }

        function submitDeleteTask(e, task) {
            e.preventDefault();

            const taskId = task.id;
            const project = task.parentProject;

            project.deleteTask(taskId);

            TodoController.setCompletedTasks();
            TodoController.updateTasks();
            TodoController.updateStorage();

            delTaskModal.style.visibility = 'hidden';
            editTaskModal.style.visibility = 'hidden';

            loadView(getCurrentView());
        }
    };

    // Cancel editing task
    cancelEditTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        editTaskForm.reset();
        editTaskModal.style.visibility = 'hidden';

    });

    /*********************************************
     * Controls for deleting a task               
     *********************************************/
    const delTaskModal = document.querySelector('#del-task-modal');
    const delBtnsContainer = document.querySelector('#del-task-btns');
    const cancelDelTaskBtn = document.querySelector('#cancel-del-task');

    function addDeleteTaskEvent(deleteBtn, task) {
        deleteBtn.addEventListener('click', function() {
            // Create submit button for each individual task, makes it easier to work
            // on the task directly instead of searching for it in array
            const delTaskSubmit = document.createElement('button');
            delTaskSubmit.id = 'del-task-submit';
            delTaskSubmit.textContent = 'Delete';
            delTaskSubmit.addEventListener('click', function(e) { submitDeleteTask(e, task) });

            // Remove any previous task delete buttons and append the new one
            delBtnsContainer.removeChild(delBtnsContainer.lastChild);
            delBtnsContainer.appendChild(delTaskSubmit);

            delTaskModal.style.visibility = 'visible';
        });

        // Submit the task's changes and update in local storage
        function submitDeleteTask(e, task) {
            const taskId = task.id;
            const project = task.parentProject;

            project.deleteTask(taskId);

            TodoController.setCompletedTasks();
            TodoController.updateTasks();
            TodoController.updateStorage();

            delTaskModal.style.visibility = 'hidden';

            loadView(getCurrentView());
        }
    }

    // Cancel deleting task
    cancelDelTaskBtn.addEventListener('click', function(e) {
        delTaskModal.style.visibility = 'hidden';
    });



    /*********************************************
     * Controls for expanding a task               
     *********************************************/
    function addExpandTaskEvent(expandBtn, component) {
        expandBtn.addEventListener('click', function() {
            // If expanded, collapse
            if (component.classList.contains('expand')) {
                component.style.maxHeight = '40px';
                component.classList.remove('expand');
            }
            // If collapsed, get height of inner content and expand to that height
            else {
                const size = component.scrollHeight;
                component.style.maxHeight = size + 'px';
                component.classList.add('expand');
            }
        })
    }

    return {
        loadView,
        setContentHeight,
        setNav,
        loadProjectList,
        addEditTaskEvent,
        addCompleteTaskEvent,
        addDeleteTaskEvent,
        addExpandTaskEvent
    }
})();

export default ScreenController;