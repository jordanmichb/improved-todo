// Use factory as IIFE since only single
// instance is needed and to utilize closures

import Project from './project.js';
import StorageController from './storageController.js';

const TodoController = (function() {
    let projects = [];
    let todayTasks = [];
    let upcomingTasks = [];
    let completedTasks = [];

    setProjects();
    setTodayTasks();
    setUpcomingTasks();
    setCompletedTasks();

    function setProjects() {
        if (!StorageController.get('projects')) {
            const fakeProject = new Project('Prepare presentation for the presentation that we need to prepare', '11/8/2024');
            const today = new Date();
            //const today = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;

            fakeProject.addTask('This task name is going to be really really really long as an example to show how it will display on screen', 
                'This task description is going to be really really really long as an example to show how it will display on screen. ' +
                'Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae velit parturient nullam dictum quisque in. Pharetra malesuada morbi primis diam ex sollicitudin! Placerat laoreet nisi congue taciti neque ante pulvinar at. Finibus fames blandit varius, nulla suscipit suspendisse sapien. Tincidunt ad libero mollis accumsan pellentesque mollis condimentum. Molestie sed fusce arcu orci posuere tortor faucibus hac. Mollis cras ullamcorper urna; egestas montes nulla vehicula sapien primis. Sit at molestie dapibus fames mi semper. Habitant faucibus dapibus convallis nec massa per. Quis in consectetur accumsan amet pharetra risus magna. Rutrum sapien eleifend netus placerat vestibulum mollis.', 
                `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, '2');
            fakeProject.addTask('Task1.2', 'description', `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, '1');
            fakeProject.addTask('Task1.3', 'description', '11/22/2024', '2');
            fakeProject.addTask('Task1.4', 'description', `${today.getMonth() + 1}/${today.getDate() + 5}/${today.getFullYear()}`, '3');
            projects.push(fakeProject);
    
            const fakeProject2 = new Project('Project2');
            fakeProject2.addTask('Task2', 'description', `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, '2');
            fakeProject2.addTask('Task2.1', 'description', `${today.getMonth() + 1}/${today.getDate() + 2}/${today.getFullYear()}`, '3');
            fakeProject2.addTask('Task2.2', 'description', '11/20/2024', '1');
            fakeProject2.addTask('Task2.3', 'description', `${today.getMonth() + 1}/${today.getDate() + 7}/${today.getFullYear()}`, '1');
            projects.push(fakeProject2);
            StorageController.setAsString('projects', projects);
        }
        else {
            projects = StorageController.getParsed('projects');
        }
    }

    /*******************************************************
     * Filter for tasks due today by converting each dueDate
     * into a date string and comparing to today's date       
     *******************************************************/
    function setTodayTasks() {
        // Get today's date and set to readable format without time ie. 'Thu Nov 14 2024'
        const today = new Date().toDateString();
        todayTasks =  getTasks().filter((task) => 
                                    new Date(task.dueDate).toDateString() === today
                                );
    }

    /**********************************************
     * Set the upcoming tasks array by filtering 
     * tasks by those that are due in the next week       
     **********************************************/
    function setUpcomingTasks() {
        const today = new Date();
        // Parse returns ms since epoch
        const nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
        // Filter all tasks due within a week then sort them
        upcomingTasks = getTasks().filter(task => 
                                    nextWeek >= Date.parse(new Date(task.dueDate)) 
                                    && nextWeek - Date.parse(new Date(task.dueDate)) <= 604800000 // ms in a week
                                  )
                                  .sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate));
    }

    function setCompletedTasks() {
        completedTasks = getTasks().filter(task => task.complete);
    }

    function updateTasks() {
        setTodayTasks();
        setUpcomingTasks();
    }

    function updateStorage() {
        StorageController.setAsString('projects', projects);
    }

    function createProject(name, dueDate) {
        const project = new Project(name, dueDate);
        projects.push(project);
        updateStorage();
    }

    function getProject(idx) { 
        return projects[idx]
    }

    function getProjects() { 
        return projects;
    }

    // Map array of all tasks from each project, then flatten to 1D array
    function getTasks() {
        return  projects.flatMap(project => project.tasks);
    }

    function getTodayTasks() {
        return todayTasks;
    }

    function getUpcomingTasks() {
        return upcomingTasks;
    }

    function getCompletedasks() {
        return completedTasks;
    }

    return {
        updateTasks,
        setCompletedTasks,
        updateStorage,
        createProject,
        getProject,
        getProjects,
        getTasks,
        getTodayTasks,
        getUpcomingTasks,
        getCompletedasks,
    }
})();

export default TodoController;