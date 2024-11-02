function createTaskView() {
    const view = document.createElement('div');
    view.id = 'content';

    const header = document.createElement('h1');
    header.textContent = 'All Tasks';

    view.appendChild(header);

    return view;
}

function loadTaskView() {
    const content = document.querySelector('#main');
    content.textContent = '';
    content.appendChild(createTaskView());
}

export default loadTaskView;