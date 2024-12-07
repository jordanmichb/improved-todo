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
            // For each project, convert to Project object
            const project = new Project(arr[i].name, arr[i].dueDate, arr[i].tasks);
            arr[i] = project;

            for (let j = 0; j < arr[i].tasks.length; j++) {
                // For each task, convert to Task object
                const t = arr[i].tasks[j];
                arr[i].tasks[j] = new Task(project, t.name, t.description, t.dueDate, t.priority, t.complete);
            }
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
        localStorage.setItem(key, JSON.stringify(item, (key, value) => {
            // Skip storing parent object to avoid circular structure
            return key === 'parentProject' ? undefined : value; 
        }));
    }

    return {
        get,
        getParsed,
        set,
        setAsString
    }
})();

export default StorageController;