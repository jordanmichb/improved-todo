// Use factory as IIFE since only single
// instance is needed and to utilize closures

import Project from './project.js';
import StorageController from './storageController.js';

const TodoController = (function() {
    let projects = [];

    if (!StorageController.get('projects')) {
        const fakeProject = new Project('Project1', '11/8/2024');
        fakeProject.addTask('Task1', 'description', '11/5/2024', 'priority', 'notes');
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


    function createProject(title, dueDate) {
        const project = new Project(title, dueDate);
        projects.push(project);
        StorageController.setStringify('projects', projects);
    }

    function getProjects() { 
        return StorageController.getParsed('projects');
    }

    function getProject(idx) { 
        const projects = StorageController.getParsed('projects');
        return projects[idx]
    }

    return {
        createProject,
        getProjects,
        getProject,
    }
})();

export default TodoController;