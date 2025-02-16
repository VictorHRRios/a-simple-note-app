import { updateSidebar, projectSelection} from "./sidebar";
export let projects = []

export class ToDoList {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get title() {return this._title;}
    get description() {return this._description;}
    get dueDate() {return this._dueDate;}
    get priority() {return this._priority;}


    set title(value) {return this._title = value;}
    set description(value) {return this._description = value;}
    set dueDate(value) {return this._dueDate = value;}
    set priority(value) {return this._priority = value;}
}

export class Project {
    toDoLists = [];

    constructor(title) {
        this.title = title;
    };

    get title() {return this._title;}

    set title(value) {return this._title = value;}


    addToDoList  = (toDoList) => {
        this.toDoLists.push(toDoList);
    }
    
    removeToDoList = (index) => {
        this.toDoLists.splice(index, 1);
    }

    getList = () => this.toDoLists;
}


export const addNote = (title, description, dueDate, priority) => {
    const newNote = new ToDoList(title, description, dueDate, priority);
    projects[projectSelection].addToDoList(newNote);
    localStorage.setItem('project', JSON.stringify(projects));
}

export const removeNote = (index) => {
    projects[projectSelection].removeToDoList(index);
    localStorage.setItem('project', JSON.stringify(projects));
    if (projects[projectSelection].getList().length == 0)
        localStorage.removeItem(`project: ${projectSelection} notes`);
}

export const addProject = (title) => {
    const newProject = new Project(title);
    projects.push(newProject);
    localStorage.setItem('project', JSON.stringify(projects));
}


export const deleteProject = (id) => {
    projects.splice(id, 1);
    localStorage.setItem('project', JSON.stringify(projects));
    if (projects.length == 0) {
        localStorage.removeItem('project');
    }
} 


export const editProject = (element, id) => {
    element.textContent = '';
    const form = document.createElement('form');
    const my_tb=document.createElement('INPUT');
    const acceptButton = document.createElement('button');
    acceptButton.textContent = "Accept";
    my_tb.type='TEXT';
    my_tb.name='myInput';
    my_tb.value= projects[id].title;
    acceptButton.addEventListener('click', ()=> {
        projects[id].title = my_tb.value;
        localStorage.setItem('project', JSON.stringify(projects));
        updateSidebar();
    })
    form.appendChild(my_tb);
    element.appendChild(form);
    element.appendChild(acceptButton);
}