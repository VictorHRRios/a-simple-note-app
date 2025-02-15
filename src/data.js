import { projectSelection, updateSidebar } from "./sidebar";
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
}

export const addProject = (title) => {
    const newProject = new Project(title);
    projects.push(newProject);
    updateSidebar();
}

