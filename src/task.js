// Use consructor so instances can share prototype
// methods instead of each having its own copy

function Task(name, description, dueDate, priority, complete = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
}

Task.prototype.editTask = function(name, description, dueDate, priority, complete) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
}

export default Task;