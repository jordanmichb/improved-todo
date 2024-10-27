// Use consructor so instances can share prototype
// methods instead of each having its own copy

function Task(title, description = '', dueDate = '', priority = '', notes = '') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
}


export { Task };