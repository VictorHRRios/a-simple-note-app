import { displayNotes } from "./note";
import { addProject, editProject, deleteProject, projects } from "./data";
import deleteImage from "./img/delete.svg";
import editImage from "./img/pencil.svg";

export let projectSelection = 0;

export const selectProject = (someid) => {
    projectSelection = someid;
    updateSidebar();
    displayNotes();
}

export const updateSidebar = () => {
    const projectsContainer = document.querySelector('div.project-container');
    projectsContainer.textContent = '';
    for (let [index, item] of projects.entries()) {
        const project = document.createElement('div');
        const select = document.createElement('div');
        select.addEventListener('click', function() {
            selectProject(project.getAttribute('data-id'));
        })
        project.classList.add('project');
        project.setAttribute(`data-id`, index)
        select.textContent = item.title;
        project.appendChild(select);
        projectsContainer.appendChild(project);
    }
    const currentlySelected = document.querySelector(`[data-id="${projectSelection}"]`)
    if (currentlySelected != null) {
        currentlySelected.classList.add('selected-project');
        const deleteButton = document.createElement('img');
        const editButton = document.createElement('img');
        deleteButton.src = deleteImage;
        editButton.src = editImage;
        deleteButton.addEventListener('click', () => {
            deleteProject(currentlySelected.getAttribute('data-id'))
            displayNotes();
            updateSidebar();
        });
        editButton.addEventListener('click', () =>{ 
            editProject(currentlySelected, currentlySelected.getAttribute('data-id'));
        });
        currentlySelected.appendChild(deleteButton);
        currentlySelected.appendChild(editButton);
    }
}


export const confirmProject = (event) => {
    const dialog = document.querySelector('dialog.create-project');
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    addProject(title);
    event.target.reset()
    dialog.close()
    updateSidebar()
    displayNotes();
}

