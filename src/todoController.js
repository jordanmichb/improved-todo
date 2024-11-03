// Use factory as IIFE since only single
// instance is needed and to utilize closures

import Project from './project.js';

const TodoController = (function() {
    const projects = [];




    const fakeProject = new Project('Project1', 'description', 'dueDate', 'priority');
    fakeProject.addTask('Task1', 'description', 'dueDate', 'priority', 'notes');
    projects.push(fakeProject);

    const fakeProject2 = new Project('Project2', 'description', 'dueDate', 'priority');
    fakeProject2.addTask('Task2', 'description', 'dueDate', 'priority', 'notes');
    projects.push(fakeProject2);




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

export default TodoController;