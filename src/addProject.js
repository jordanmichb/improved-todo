function createAddProjectModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const title = document.createElement('')

    return modal;
}

function loadAddProjectModal() {
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    overlay.appendChild(createAddProjectModal());
    document.body.appendChild(overlay);
}

export default loadAddProjectModal;