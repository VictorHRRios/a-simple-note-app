const createButton = (event) => {
    const button = document.createElement('button');
    button.classList.add('project');
    button.textContent = item.title;
    button.addEventListener('click', event);
    return button;
}


export {createButton}