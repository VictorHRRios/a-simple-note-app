import "./styles.css"
import {showDialogProject} from './dom.js'
import {projects, Project, ToDoList} from './data.js'
import { updateSidebar } from "./sidebar.js";

const defaultSidebar = (function(){
    const projectsStorage = localStorage.getItem('project');
    if (projectsStorage) {
        const projectsStored = JSON.parse(projectsStorage)
        for (let project of projectsStored) {
            const newProject = new Project(project._title);
            projects.push(newProject)
            for (let toDo of project.toDoLists) {
                const newNote = new ToDoList(toDo._title, toDo._description, toDo._dueDate, toDo._priority);
                newProject.addToDoList(newNote);
            }
        }
      } else {
        console.log('User data not found in local storage')
        let newProject = new Project("A sample project");
        projects.push(newProject);
    }
    updateSidebar();
})();


const createProject = (function() {
    const createProjectButton = document.querySelector('.button-project');
    createProjectButton.addEventListener('click', showDialogProject);
})()