import { Task } from "./task";

function Project(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    this.tasks = [];
}


Project.prototype.addTask = function(title, description, dueDate, priority, notes) {
    const task = new Task(title, description, dueDate, priority, notes);
    this.tasks.push(task);
}

export { Project };