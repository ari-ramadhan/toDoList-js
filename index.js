const addForm = document.querySelector(".add");
const clear = document.querySelector('.clear')
const searchForm = document.querySelector('form')
const clearSearch = document.querySelector('.bi-x-circle')
let messages = document.querySelector('ul.tasks p')
const taskBox = document.querySelector('ul.tasks')
let taskList = document.querySelectorAll('ul.tasks li')
const messageSpan = document.querySelector(".message span");

// function to update message based on the number of tasks
function updateMessage() {
    const textLength = taskBox.children.length;
    messageSpan.textContent = `You have ${textLength - 1} pending tasks.`; // -1 to exclude the message itself
}

// initial update of the message
updateMessage();

// function to toggle message visibility based on the number of visible tasks
function toggleMessageVisibility() {
    const visibleTasks = document.querySelectorAll('ul.tasks li[style="display: flex;"]');
    if (visibleTasks.length === 0) {
        messages.classList.remove('hide');
        messages.textContent = "Pencarian Anda tidak menghasilkan apapun.";
    } else {
        messages.classList.add('hide');
    }
}

// function to handle search input changes
searchForm.addEventListener('keyup', event => {
    let searchValue = event.target.value.toLowerCase();
    taskList.forEach((item, index) => {
        let spanText = item.querySelector('span').textContent.toLowerCase();
        if (spanText.includes(searchValue)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
    toggleMessageVisibility();
});

// function to handle clearing the search input
clearSearch.addEventListener('click', () => {
    let taskList = document.querySelectorAll('ul.tasks li');
    searchForm.querySelector('input').value = '';
    taskList.forEach(item => {
        item.style.display = 'flex';
    });
    messages.classList.add('hide');
});

// function to handle adding tasks
addForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = addForm.task.value.trim();
    if (value.length) {
        taskBox.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`;
        addForm.reset();
        updateMessage();
    }
    document.querySelector('ul p').classList.add('hide')
});

// function to handle deleting tasks
taskBox.addEventListener('click', event => {
    if (event.target.tagName == "I") {
        event.target.parentElement.remove();
        updateMessage();
        const visibleTasks = document.querySelectorAll('ul.tasks li');
        if (visibleTasks.length === 0) {
            messages.classList.remove('hide');
            messages.textContent = "Tidak ada satupun task disini, coba tambah beberapa!";
        } else {
            messages.classList.add('hide');
        }
    }
});

// function to handle clearing all tasks
clear.addEventListener('click', () => {
    let taskList = document.querySelectorAll('ul.tasks li');
    taskList.forEach(li => {
        li.remove();
    });
    messages.classList.remove('hide');
    updateMessage();
});
