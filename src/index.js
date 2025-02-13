import "./styles.css"
import {updateSidebar} from './dom.js'
import {projects, Project} from './data.js'

const defaultSidebar = (function(){
    let newProject = new Project("A sample project");
    projects.push(newProject);
    projects.push(newProject);
    updateSidebar();
})();