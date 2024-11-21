// Use consructor so instances can share prototype
// methods instead of each having its own copy

function Task(title, description, dueDate, priority, complete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
}

Task.prototype.editTask = function(title, description, dueDate, priority, complete) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
}

export default Task;