import Task from "./task";

function Project(name, dueDate = '', tasks = []) {
    this.name = name;
    this.dueDate = dueDate;

    this.tasks = tasks;
}


Project.prototype.addTask = function(name, description, dueDate, priority) {
    const task = new Task(name, description, dueDate, priority);
    this.tasks.push(task);
}

export default Project;