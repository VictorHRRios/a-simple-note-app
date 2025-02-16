import { showDialogNote } from "./dom";
import { addNote, projects, removeNote } from "./data";
import { projectSelection } from "./sidebar";
import deleteImage from "./img/delete.svg";

export const displayNotes = () => {
    const noteDisplay = document.querySelector('div.notes');
    noteDisplay.textContent = '';
    noteDisplay.style.backgroundColor = "#133C55";
    if (projects[projectSelection] == undefined) return;
    const buttonNewNote = document.createElement('button');
    buttonNewNote.addEventListener('click', function() {
        showDialogNote()
    })
    noteDisplay.style.backgroundColor = "#D4D2D5";
    buttonNewNote.textContent = 'Create a new note'
    noteDisplay.appendChild(buttonNewNote);
    buttonNewNote.classList.add('new-note-button');
    for (let [index,element] of projects[projectSelection].getList().entries()) {
        createNoteSummary(index, element);
    }
}

const createNoteSummary = (index, note) => {
    const noteDisplay = document.querySelector('div.notes');
    const summary = document.createElement('div');
    const detail = document.createElement('div');
    const title = document.createElement('div');
    const dueDate = document.createElement('div');
    const priority = document.createElement('div');
    const description = document.createElement('div');
    const deleteButton = document.createElement('img');
    summary.classList.add('note-summary');
    summary.setAttribute('data-id', index);
    detail.classList.add('note-detail');
    title.classList.add('title');
    dueDate.classList.add('dueDate');
    description.classList.add('description');
    priority.classList.add('priority');
    title.textContent = note.title;
    dueDate.textContent = note.dueDate;
    description.textContent = "description: " + note.description;
    priority.textContent = note.priority;
    deleteButton.src = deleteImage;
    deleteButton.addEventListener('click', () => {
        removeNote(index);
        displayNotes();
    })
    summary.addEventListener('click', () =>{
        if (detail.textContent.trim() !== '') {
            detail.textContent = '';
        } else {
            detail.append(description);
        }
    });
    summary.append(priority, title, dueDate, deleteButton, detail)
    noteDisplay.appendChild(summary);
}


export const confirmNote = (event) => {
    const dialog = document.querySelector('dialog.create-note');
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description =  formData.get('description') == '' ? 'No description' : formData.get('description');
    const dueDate = formData.get('dueDate') == '' ? 'No due date' : formData.get('dueDate');
    const priority =  formData.get('priority');
    addNote(title, description, dueDate, priority);
    event.target.reset();
    dialog.close();
    displayNotes();
}