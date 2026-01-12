
// State Management
    let todos = [];
    let currentEditId = null;

    // DOM Elements
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const taskCount = document.getElementById('taskCount');
    const clearCompleted = document.getElementById('clearCompleted');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editInput = document.getElementById('editInput');
    const saveEditBtn = document.getElementById('saveEditBtn');

    // Add Task
    function addTask() {
        const text = todoInput.value.trim();
        if (text === "") return;

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(newTodo);
        todoInput.value = "";
        render();
    }

    // Toggle Complete
    function toggleTodo(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        render();
    }

    // Delete Task
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        render();
    }

    // Open Edit Modal
    function openEdit(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            currentEditId = id;
            editInput.value = todo.text;
            editModal.show();
        }
    }

    // Save Edit
    saveEditBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText && currentEditId) {
            todos = todos.map(todo => 
                todo.id === currentEditId ? { ...todo, text: newText } : todo
            );
            editModal.hide();
            render();
        }
    });

    // Clear All Completed
    clearCompleted.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        render();
    });

    // Render List
    function render() {
        if (todos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        } else {
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const div = document.createElement('div');
                div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                div.innerHTML = `
                    <input type="checkbox" class="form-check-input" ${todo.completed ? 'checked' : ''} 
                        onclick="toggleTodo(${todo.id})">
                    <span class="todo-text" onclick="toggleTodo(${todo.id})">${todo.text}</span>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary" onclick="openEdit(${todo.id})">Edit</button>
                        <button class="btn btn-outline-danger" onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                `;
                todoList.appendChild(div);
            });
        }

        // Update Counter
        const activeCount = todos.filter(t => !t.completed).length;
        taskCount.innerText = `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
    }

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Initial Render
    render();