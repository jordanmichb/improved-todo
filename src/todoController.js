// Use factory as IIFE since only single
// instance is needed and to utilize closures

import Project from './project.js';
import StorageController from './storageController.js';

const TodoController = (function() {
    let projects = [];
    let todayTasks = [];
    let upcomingTasks = [];

    if (!StorageController.get('projects')) {
        const fakeProject = new Project('Project1', '11/8/2024');
        fakeProject.addTask('Task1', 'description', '11/14/2024', 'priority', 'notes');
        fakeProject.addTask('Task1.2', 'description', '11/28/2024', 'priority', 'notes');
        fakeProject.addTask('Task1.3', 'description', '11/18/2024', 'priority', 'notes');
        projects.push(fakeProject);

        const fakeProject2 = new Project('Project2');
        fakeProject2.addTask('Task2', 'description', '11/25/2024', 'priority', 'notes');
        projects.push(fakeProject2);
        StorageController.setStringify('projects', projects);
    }
    else {
        projects = StorageController.getParsed('projects');
    }

    setTodayTasks();


    function createProject(title, dueDate) {
        const project = new Project(title, dueDate);
        projects.push(project);
        StorageController.setStringify('projects', projects);
    }

    function getProjects() { 
        //return StorageController.getParsed('projects');
        return projects;
    }

    function getProject(idx) { 
        const projects = StorageController.getParsed('projects');
        return projects[idx]
    }


    function getTasks() {
        return  projects.flatMap(project => project.tasks);
    }

    // flatMap to get array of tasks only, 
    // then filter for tasks due today by converting
    // each dueDate into a date string and comparing to today's date,
    function setTodayTasks() {
        // Get today's date and set to readable format without time ie. 'Thu Nov 14 2024'
        const today = new Date().toDateString();
        todayTasks =  projects.flatMap(project => project.tasks)
                              .filter((task) => new Date(task.dueDate).toDateString() === today);
    }

    function getTodayTasks() {
        return todayTasks;
    }

    return {
        createProject,
        getProjects,
        getProject,
        getTasks,
        getTodayTasks,
    }
})();

export default TodoController;