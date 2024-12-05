import Task from './task';
import Project from './project';

const StorageController = (function(){
    function get(item) {
        return localStorage.getItem(item);
    }

    /************************************************************************************
     * Retrieves JSON data from local storage and parses into JavaScript values
     * and objects. Since JSON cannot recognize most objects, each task of the task array 
     * is converted back into a Task object. Then each project is converted back into a 
     * Project object
     ************************************************************************************/
    function getParsed(item) {
        // Get parsed JSON string
        const arr = JSON.parse(localStorage.getItem(item));
        // Loop over all projects and all the project's tasks
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].tasks.length; j++) {
                // For each task, convert to Task object
                const t = arr[i].tasks[j];
                arr[i].tasks[j] = new Task(arr[i].name, t.name, t.description, t.dueDate, t.priority, t.complete);
            }
            // For each project, convert to Project object
            arr[i] = new Project(arr[i].name, arr[i].dueDate, arr[i].tasks)
        }

        return arr;
    }
    /************************************************
     * Add key, item to storage, or update if exists 
     ************************************************/
    function set(key, item) {
        localStorage.setItem(key, item);
    }

    /************************************************
     * Add key, item to storage, or update if exists. 
     * Storage only supports strings, so other data
     * types need tot be converted
     ************************************************/
    function setAsString(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    return {
        get,
        getParsed,
        set,
        setAsString
    }
})();

export default StorageController;