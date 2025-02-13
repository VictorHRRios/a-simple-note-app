import {projects} from './data'

export const createButton = (event) => {
    const button = document.createElement('button');
    button.addEventListener('click', event);
    return button;
}


export const updateNotes = () => {
    const noteDisplay = document.querySelector('div.notes');
    noteDisplay.textContent = '';
    noteDisplay.appendChild(createButton(showDialog));
}

export const updateSidebar = () => {
    const projectsContainer = document.querySelector('div.project-container');
    for (let item of projects) {
        const button = createButton(updateNotes);
        button.classList.add('project');
        button.textContent = item.title;
        projectsContainer.appendChild(button);
    }
}

const showDialog = () => {
    const dialog = document.querySelector('dialog');
    dialog.showModal();
    const acceptDialog = document.querySelector('form');
    console.table(acceptDialog.elements)
    acceptDialog.addEventListener('submit', confirmDialog);
    const cancelDialog = document.querySelector('button.cancel');
    cancelDialog.addEventListener('click', closeDialog);
}

const closeDialog = (event) => {
    const dialog = document.querySelector('dialog');
    event.preventDefault();
    dialog.close()
}

const confirmDialog = (event) => {
    const dialog = document.querySelector('dialog');
    event.preventDefault();
    const formData = new FormData(event.target);
    console.table(formData);
    event.target.reset()
    dialog.close()
}