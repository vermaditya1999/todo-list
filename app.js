const TODO_CACHE = 'todoListData';

const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-ul');

function loadTodos() {
    const data = localStorage.getItem(TODO_CACHE);

    if (!data) {
        localStorage.setItem(TODO_CACHE, '[]');
    } else {
        const todoListData = JSON.parse(data);
        todoListData.forEach(todo => {
            todoList.appendChild(createTodoLi(todo));
        });
    }
}

function createTodoLi(todo) {
    const li = document.createElement('li');
    li.innerHTML = `<div class="todo">
                        ${todo}
                    </div>
                    <div class="close">
                        <i class="fa fa-times"></i>
                    </div>`;
    return li;
}

function addTodo(event) {
    if (event.keyCode !== 13) {
        return;
    }

    const todo = event.target.value;
    
    if (todo === '') {
        return;
    }
    
    todoList.prepend(createTodoLi(todo));

    // Update local storage
    const data = JSON.parse(localStorage.getItem(TODO_CACHE));
    data.unshift(todo);
    localStorage.setItem(TODO_CACHE, JSON.stringify(data));
};

function removeTodo(event) {
    const parent = event.target.parentElement;
    
    if (parent !== null && parent.className === 'close') {
        const li = parent.parentElement;

        // Find index of this li
        let idx = 0, child = li;
        while ((child = child.previousElementSibling) != null) {
            idx++;
        }
        
        // Update local storage
        const data = JSON.parse(localStorage.getItem(TODO_CACHE));
        data.splice(idx, 1);
        localStorage.setItem(TODO_CACHE, JSON.stringify(data));

        li.remove();
    }
};

// Add event listeners
document.addEventListener('DOMContentLoaded', loadTodos);
todoInput.addEventListener('keydown', addTodo);
todoList.addEventListener('click', removeTodo);