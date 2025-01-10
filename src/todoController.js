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

    /*******************************************************
     * If there are no projects in local storage, create some
     * template projects as examples. Otherwise, get projects
     * from local storage.       
     *******************************************************/
    function setProjects() {
        if (!StorageController.get('projects')) {
            setTemplateProjects();
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

    // Create sample projects and tasks to populate todo list
    function setTemplateProjects() {
        const today = new Date();
        const withinWeek = new Date();
        withinWeek.setDate(today.getDate() + 3);
        const withinWeek2 = new Date();
        withinWeek2.setDate(today.getDate() + 5);
        const outOfRange = new Date();
        outOfRange.setDate(today.getDate() + 50);

        const templateProject = new Project('Prepare Presentation');
        templateProject.addTask('Revise introduction', 'Current intro is lame.', `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, '1', true);
        templateProject.addTask('Simplify slide layouts', 'Some slides are overcrowded or have unnecessary details.', `${withinWeek.getMonth() + 1}/${withinWeek.getDate()}/${withinWeek.getFullYear()}`, '1');
        templateProject.addTask('Add notes to each slide', 'Notes are needed as talking points for presenation audio.', `${withinWeek2.getMonth() + 1}/${withinWeek2.getDate()}/${withinWeek2.getFullYear()}`, '2');
        templateProject.addTask('Print handouts for attendees', 'Need 5 million.', `${outOfRange.getMonth() + 1}/${outOfRange.getDate()}/${outOfRange.getFullYear()}`, '3');
        projects.push(templateProject);

        const templateProject2 = new Project('Plan Vacation');
        templateProject2.addTask('Choose destination', 'Anywhere but here.', `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, '3', true);
        templateProject2.addTask('Book Hotel', '5 star only!', `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, '2', true);
        templateProject2.addTask('Create itinerary', 'Should use an online template to make it organized.', `${withinWeek.getMonth() + 1}/${withinWeek.getDate()}/${withinWeek.getFullYear()}`, '1');
        templateProject2.addTask('Book flights', 'Get the airline with the best food.', `${withinWeek2.getMonth() + 1}/${withinWeek2.getDate()}/${withinWeek2.getFullYear()}`, '1');
        projects.push(templateProject2);
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