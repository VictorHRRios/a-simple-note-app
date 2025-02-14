import "./styles.css"
import {updateSidebar, confirmProject, closeDialog, displayNotes} from './dom.js'
import {projects, Project} from './data.js'

const defaultSidebar = (function(){
    let newProject = new Project("A sample project");
    projects.push(newProject);
    updateSidebar();
    displayNotes();
})();



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