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

    addToDoList = (toDoList) => {
        toDoLists.push(toDoList);
    }
}


const addNote = () => {
    let newNote = new Project()
}

