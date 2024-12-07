import Task from "./task";

function Project(name, dueDate = '', tasks = []) {
    this.name = name;
    this.dueDate = dueDate;

    this.tasks = tasks;
}

// Binary search for task index
Project.prototype.getTaskIndex = function(id) {
    let lower = 0;
    let upper = this.tasks.length - 1;

    while (lower <= upper) {
        const mid = lower + Math.floor((upper - lower) / 2);

        if (id === this.tasks[mid].id) {
            return mid;
        }
        else if (this.tasks[mid].id < id) {
            lower = mid + 1;
        }
        else {
            upper = mid - 1;
        }
    }

    return -1;
}

Project.prototype.addTask = function(taskName, description, dueDate, priority) {
    // First param sets parent project
    const task = new Task(this, taskName, description, dueDate, priority);
    this.tasks.push(task);
};

Project.prototype.deleteTask = function(id) {
    const index = this.getTaskIndex(id);
    
    if (index != -1) { 
        console.log(index)
        this.tasks.splice(index, 1) 
    };
};

export default Project;