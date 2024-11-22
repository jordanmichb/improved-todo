// Use factory as IIFE since only single
// instance is needed and to utilize closures

import Project from './project.js';
import StorageController from './storageController.js';

const TodoController = (function() {
    let projects = [];
    let todayTasks = [];
    let upcomingTasks = [];

    setProjects();
    setTodayTasks();
    setUpcomingTasks();

    function setProjects() {
        if (!StorageController.get('projects')) {
            const fakeProject = new Project('Project1', '11/8/2024');
            fakeProject.addTask('This task name is going to be really really really long as an example to show how it will display on screen', 'description', '11/14/2024', 'priority');
            fakeProject.addTask('Task1.2', 'description', '12/15/2024', 'priority', true);
            fakeProject.addTask('Task1.3', 'description', '11/22/2024', 'priority');
            fakeProject.addTask('Task1.4', 'description', '11/22/2024', 'priority');
            projects.push(fakeProject);
    
            const fakeProject2 = new Project('Project2');
            fakeProject2.addTask('Task2', 'description', '11/21/2024', 'priority');
            fakeProject2.addTask('Task2.1', 'description', '11/22/2025', 'priority');
            fakeProject2.addTask('Task2.2', 'description', '11/20/2024', 'priority');
            fakeProject2.addTask('Task2.3', 'description', '11/14/2024', 'priority');
            projects.push(fakeProject2);
            StorageController.setStringify('projects', projects);
        }
        else {
            projects = StorageController.getParsed('projects');
        }
    }

    // Filter for tasks due today by converting
    // each dueDate into a date string and comparing to today's date,
    function setTodayTasks() {
        // Get today's date and set to readable format without time ie. 'Thu Nov 14 2024'
        const today = new Date().toDateString();
        todayTasks =  getTasks().filter((task) => 
                                    new Date(task.dueDate).toDateString() === today
                                );
    }

    function setUpcomingTasks() {
        const today = new Date();
        const nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));

        upcomingTasks = getTasks().filter(task => 
                                    nextWeek >= Date.parse(new Date(task.dueDate)) 
                                    && nextWeek - Date.parse(new Date(task.dueDate)) <= 604800000
                                  )
                                  .sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate));
    }

    function updateStorage() {
        StorageController.setStringify('projects', projects);
    }

    function createProject(title, dueDate) {
        const project = new Project(title, dueDate);
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

    return {
        updateStorage,
        createProject,
        getProject,
        getProjects,
        getTasks,
        getTodayTasks,
        getUpcomingTasks,
    }
})();

export default TodoController;