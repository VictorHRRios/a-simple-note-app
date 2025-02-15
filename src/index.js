import "./styles.css"
import {showDialogProject} from './dom.js'
import {projects, Project} from './data.js'
import { updateSidebar } from "./sidebar.js";
import { displayNotes } from "./note.js";

const defaultSidebar = (function(){
    let newProject = new Project("A sample project");
    projects.push(newProject);
    updateSidebar();
    displayNotes();
})();


const createProject = (function() {
    const createProjectButton = document.querySelector('.button-project');
    createProjectButton.addEventListener('click', showDialogProject);
})()