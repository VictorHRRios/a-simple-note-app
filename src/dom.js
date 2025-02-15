import { confirmProject } from "./sidebar";
import { confirmNote } from "./note";

export const showDialogNote = () => {
    const dialog = document.querySelector(`dialog.create-note`);
    dialog.showModal();
    const acceptDialog = document.querySelector(`form.create-note`);
    acceptDialog.addEventListener('submit', confirmNote);
    const cancelDialog = document.querySelector('button.cancel');
    cancelDialog.addEventListener('click', closeDialog);
}

export const closeDialog = (event) => {
    const dialog = document.querySelector('dialog');
    event.preventDefault();
    dialog.close()
}

export const showDialogProject = () => {
    const dialog = document.querySelector(`dialog.create-project`);
    dialog.showModal();
    const acceptDialog = document.querySelector(`form.create-project`);
    console.table(acceptDialog.elements)
    acceptDialog.addEventListener('submit', confirmProject);
    const cancelDialog = document.querySelector('button.cancel');
    cancelDialog.addEventListener('click', closeDialog);
}


