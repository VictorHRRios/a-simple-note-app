import { projectSelection } from "./dom";
export let projects = []

export class ToDoList {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
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
}


export const addNote = (title, description, dueDate, priority) => {
    const newNote = new ToDoList(title, description, dueDate, priority);
    projects[projectSelection].addToDoList(newNote);
    console.table(projects);
}

