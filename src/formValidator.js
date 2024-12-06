
function validateAddTask() {
    const name = document.querySelector('#task-name');
    const dueDate = document.querySelector('#task-due');
    
    if (name.value === '') { return false }
    if (dueDate.value === '') { return false }
    return true;
}

function validateEditTask() {
    const name = document.querySelector('#edit-task-name');
    const dueDate = document.querySelector('#edit-task-due');
    
    if (name.value === '') { return false }
    if (dueDate.value === '') { return false }
    return true;
}

export { 
    validateAddTask,
    validateEditTask,
};