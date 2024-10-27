// Use factory as IIFE since only single
// instance is needed and to utilize closures

import { Project } from './project.js';

const TodoController = (function() {
    const projects = [];

    function createProject(title, description, dueDate, priority) {
        const project = new Project(title, description, dueDate, priority);
        projects.push(project);
    }

    function getProjects() { return projects }

    return {
        createProject,
        getProjects,
    }
})();

export { TodoController };