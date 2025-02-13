import {projects, addNote, Project, ToDoList, addProject} from './data'


export let projectSelection = 0;

export const createButton = (onClickHandler) => {
    const button = document.createElement('button');
    button.addEventListener('click', onClickHandler);
    return button;
}


export const updateNotes = (event) => {
    const clickedProjectId = parseInt(event.target.getAttribute('data-id'));
    const noteDisplay = document.querySelector('div.notes');
    const createNote = createButton(showDialogNote)

    noteDisplay.textContent = '';
    noteDisplay.style.backgroundColor = "#D4D2D5";
    createNote.textContent = 'Create a new note'
    createNote.classList.add('new-note-button');
    projectSelection = clickedProjectId;

    noteDisplay.appendChild(createNote);
    updateSidebar();
    displayNotes();
}

const displayNotes = () => {
    for (let element of projects[projectSelection].getList()) {
        createNote(element);
    }
}



const createNote = (note) => {
    const noteDisplay = document.querySelector('div.notes');
    const div = document.createElement('div');
    const title = document.createElement('div');
    const description = document.createElement('div');
    const dueDate = document.createElement('div');
    const priority = document.createElement('div');
    title.textContent = note.title;
    description.textContent = note.description;
    dueDate.textContent = note.dueDate;
    priority.textContent = note.priority;
    div.append(title, description, dueDate, priority)
    noteDisplay.appendChild(div);
}

export const updateSidebar = () => {
    const projectsContainer = document.querySelector('div.project-container');
    projectsContainer.textContent = '';
    for (let [index, item] of projects.entries()) {
        const button = createButton(updateNotes);
        button.classList.add('project');
        button.setAttribute(`data-id`, index)
        button.textContent = item.title;
        projectsContainer.appendChild(button);
    }
    const currentlySelected = document.querySelector(`[data-id="${projectSelection}"]`)
    currentlySelected.style.backgroundColor = "#3ABEFF";
}


const showDialogNote = () => {
    const dialog = document.querySelector(`dialog.create-note`);
    dialog.showModal();
    const acceptDialog = document.querySelector(`form.create-note`);
    //console.table(acceptDialog.elements)
    acceptDialog.addEventListener('submit', confirmNote);
    const cancelDialog = document.querySelector('button.cancel');
    cancelDialog.addEventListener('click', closeDialog);
}

const showDialogProject = () => {
    const dialog = document.querySelector(`dialog.create-project`);
    dialog.showModal();
    const acceptDialog = document.querySelector(`form.create-project`);
    console.table(acceptDialog.elements)
    acceptDialog.addEventListener('submit', confirmProject);
    const cancelDialog = document.querySelector('button.cancel');
    cancelDialog.addEventListener('click', closeDialog);
}

const createProject = (function() {
    const createProjectButton = document.querySelector('.button-project');
    createProjectButton.addEventListener('click', showDialogProject);
})()

const closeDialog = (event) => {
    const dialog = document.querySelector('dialog');
    event.preventDefault();
    dialog.close()
}

const confirmNote = (event) => {
    const dialog = document.querySelector('dialog.create-note');
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description =  formData.get('description');
    const dueDate =  formData.get('dueDate');
    const priority =  formData.get('priority');
    addNote(title, description, dueDate, priority);
    event.target.reset()
    dialog.close()
    displayNotes();
}

const confirmProject = (event) => {
    const dialog = document.querySelector('dialog.create-project');
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    addProject(title);
    event.target.reset()
    dialog.close()
    updateSidebar();
}