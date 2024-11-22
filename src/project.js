import Task from "./task";

function Project(title, dueDate = '', tasks = []) {
    this.title = title;
    this.dueDate = dueDate;

    this.tasks = tasks;
}


Project.prototype.addTask = function(title, description, dueDate, priority) {
    const task = new Task(title, description, dueDate, priority);
    this.tasks.push(task);
}

export default Project;