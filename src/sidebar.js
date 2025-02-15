import { displayNotes } from "./note";
import { addProject, projects } from "./data";
import deleteImage from "./img/delete.svg";

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
        project.addEventListener('click', function() {
            selectProject(this.getAttribute('data-id'));
        })
        project.classList.add('project');
        project.setAttribute(`data-id`, index)
        project.textContent = item.title;
        projectsContainer.appendChild(project);
    }
    const currentlySelected = document.querySelector(`[data-id="${projectSelection}"]`)
    currentlySelected.classList.add('selected-project');
    const deleteButton = document.createElement('img');
    deleteButton.src = deleteImage;
    currentlySelected.appendChild(deleteButton);
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

const deleteProject = () => {

} 