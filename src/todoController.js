// Use factory as IIFE since only single
// instance is needed and to utilize closures

import Project from './project.js';
import StorageController from './storageController.js';

const TodoController = (function() {
    let projects = [];

    if (!StorageController.get('projects')) {
        const fakeProject = new Project('Project1', 'dueDate');
        fakeProject.addTask('Task1', 'description', 'dueDate', 'priority', 'notes');
        fakeProject.addTask('Task1.2', 'description', 'dueDate', 'priority', 'notes');
        fakeProject.addTask('Task1.3', 'description', 'dueDate', 'priority', 'notes');
        projects.push(fakeProject);

        const fakeProject2 = new Project('Project2','dueDate');
        fakeProject2.addTask('Task2', 'description', 'dueDate', 'priority', 'notes');
        projects.push(fakeProject2);
        StorageController.setStringify('projects', projects);
    }
    else {
        projects = StorageController.getParsed('projects');
    }


    function createProject(title, dueDate) {
        const project = new Project(title, dueDate);
        projects.push(project);
        StorageController.setStringify('projects', projects);
    }

    function getProjects() { 
        return StorageController.getParsed('projects');
    }

    return {
        createProject,
        getProjects,
    }
})();

export default TodoController;