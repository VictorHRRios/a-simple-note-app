import {projects, addNote, Project, ToDoList, addProject} from './data'


export let projectSelection = 0;

export const createButton = (onClickHandler) => {
    const button = document.createElement('button');
    button.addEventListener('click', onClickHandler);
    return button;
}


export const selectProject = (event) => {
    const clickedProjectId = parseInt(event.target.getAttribute('data-id'));
    projectSelection = clickedProjectId;
    updateSidebar();
    displayNotes();
}

export const displayNotes = () => {
    const noteDisplay = document.querySelector('div.notes');
    const buttonNewNote = createButton(showDialogNote)

    noteDisplay.textContent = '';
    noteDisplay.style.backgroundColor = "#D4D2D5";
    buttonNewNote.textContent = 'Create a new note'
    noteDisplay.appendChild(buttonNewNote);
    buttonNewNote.classList.add('new-note-button');
    for (let element of projects[projectSelection].getList()) {
        createNoteSummary(element);
    }
}



const createNoteSummary = (note) => {
    const noteDisplay = document.querySelector('div.notes');
    const summary = document.createElement('div');
    const detail = document.createElement('div');
    const title = document.createElement('div');
    const dueDate = document.createElement('div');
    const description = document.createElement('div');
    const priority = document.createElement('div');
    summary.classList.add('note-summary');
    detail.classList.add('note-detail');
    title.classList.add('title');
    dueDate.classList.add('dueDate');
    description.classList.add('description');
    priority.classList.add('priority');
    title.textContent = note.title;
    dueDate.textContent = note.dueDate;
    description.textContent = "description: " + note.description;
    priority.textContent = note.priority;
    summary.addEventListener('click', () =>{
        if (detail.textContent.trim() !== '') {
            detail.textContent = '';
        } else {
            detail.append(description, priority);
        }
    });
    summary.append(title, dueDate, detail)
    noteDisplay.appendChild(summary);
}

export const updateSidebar = () => {
    const projectsContainer = document.querySelector('div.project-container');
    projectsContainer.textContent = '';
    for (let [index, item] of projects.entries()) {
        const button = createButton(selectProject);
        button.classList.add('project');
        button.setAttribute(`data-id`, index)
        button.textContent = item.title;
        projectsContainer.appendChild(button);
    }
    const currentlySelected = document.querySelector(`[data-id="${projectSelection}"]`)
    currentlySelected.classList.add('selected-project');
}


const showDialogNote = () => {
    const dialog = document.querySelector(`dialog.create-note`);
    dialog.showModal();
    const acceptDialog = document.querySelector(`form.create-note`);
    acceptDialog.addEventListener('submit', confirmNote);
    const cancelDialog = document.querySelector('button.cancel');
    cancelDialog.addEventListener('click', closeDialog);
}

export const closeDialog = (event) => {
    const dialog = document.querySelector('dialog');
    event.preventDefault();
    dialog.close()
}

const confirmNote = (event) => {
    const dialog = document.querySelector('dialog.create-note');
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description =  formData.get('description') == '' ? 'No description' : formData.get('description');
    if (formData.get('dueDate') == '') {
        const date = new Date();
        dueDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    } else {
        dueDate = formData.get('dueDate');
    }
    const priority =  formData.get('priority');
    addNote(title, description, dueDate, priority);
    event.target.reset()
    dialog.close()
    displayNotes();
}

export const confirmProject = (event) => {
    const dialog = document.querySelector('dialog.create-project');
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    addProject(title);
    event.target.reset()
    dialog.close()
}