import Task from "./task";

function Project(name, dueDate = '', tasks = []) {
    this.name = name;
    this.dueDate = dueDate;

    this.tasks = tasks;
}


Project.prototype.addTask = function(taskName, description, dueDate, priority) {
    // First param sets parent project
    const task = new Task(this.name, taskName, description, dueDate, priority);
    this.tasks.push(task);
}

export default Project;