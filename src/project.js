import Task from "./task";

function Project(title, dueDate = '') {
    this.title = title;
    this.dueDate = dueDate;

    this.tasks = [];
}


Project.prototype.addTask = function(title, description, dueDate, priority, notes, complete) {
    const task = new Task(title, description, dueDate, priority, notes, complete);
    this.tasks.push(task);
}

export default Project;