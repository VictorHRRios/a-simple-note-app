let projects = []

class toDoList {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class project {
    toDoLists = [];

    constructor(title) {
        this.title = title;
    };

    get title() {return this._title;}

    set title(value) {return this._title = value;}

    addToDoList = (toDoList) => {
        toDoLists.push(toDoList);
    }
}

const updateNotes = () => {
    const noteDisplay = document.querySelector('div.notes');
    noteDisplay.textContent = '';
    noteDisplay.appendChild(createButton(addNote));
}


const updateSidebar = () => {
    const projectsContainer = document.querySelector('div.project-container');
    for (item of projects) {
        projectsContainer.appendChild(createButton(updateNotes));
    }
}

const createButton = (event) => {
    const button = document.createElement('button');
    button.classList.add('project');
    button.textContent = item.title;
    button.addEventListener('click', event);
    return button;
}

const addNote = () => {
    let newNote = new project()
}

const defaultSidebar = (function(){
    let newProject = new project("A sample project");
    projects.push(newProject);
    projects.push(newProject);
    updateSidebar();
})();
