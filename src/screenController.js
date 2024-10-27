import { TodoController } from './todoController.js';

const button = document.querySelector('#button');
const button1 = document.querySelector('#button1');

const ScreenController = (function() {
    let num = 0;
    let num2 = 0;






    button.addEventListener('click', function() {
        TodoController.createProject(num);
        num++;
        console.log(TodoController.getProjects());
    })

    button1.addEventListener('click', function() {
        TodoController.getProjects()[num2].addTask(num2);
        num2++;
        console.log(TodoController.getProjects());
    })
    
})();

export { ScreenController };