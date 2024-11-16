// Use consructor so instances can share prototype
// methods instead of each having its own copy

function Task(title, description, dueDate, priority, notes, complete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.complete = complete;
}


export default Task;