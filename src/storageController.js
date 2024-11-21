import Task from './task';
import Project from './project';

const StorageController = (function(){
    function fromJSON(json) {
        if (json.type === 'Task') {
            console.log('is task')
            return new Task(json.title, json.description, json.dueDate, json.priority, json.complete)
        }
        else if (json.type === 'Project') {
            console.log('is project')
            return new Project(json.title, json.dueDate, json.tasks)
        }
    }

    function get(item) {
        return localStorage.getItem(item);
    }

    /*
    * Retrieves JSON data from local storage and parses into JavaScript values
    * and objects. Since JSON cannot recognize most objects, each task of the task array 
    * is converted back into a Task object. Then each project is converted back into a 
    * Project object
    */
    function getParsed(item) {
        // Get parsed JSON string
        const arr = JSON.parse(localStorage.getItem(item));
        // Loop over all projects and all tthe project's tasks
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].tasks.length; j++) {
                // For each task, convert to Task object
                const t = arr[i].tasks[j];
                arr[i].tasks[j] = new Task(t.title, t.description, t.dueDate, t.priority, t.complete);
            }
            // For each project, convert to Project object
            arr[i] = new Project(arr[i].title, arr[i].dueDate, arr[i].tasks)
        }

        return arr;
    }

    function set(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    function setStringify(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    return {
        get,
        getParsed,
        set,
        setStringify
    }
})();

export default StorageController;