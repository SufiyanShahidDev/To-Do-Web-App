//  const todoInput = document.getElementById('todoInput');
//         const addButton = document.getElementById('addButton');
//         const todoList = document.getElementById('todoList');
//         const taskCountLabel = document.getElementById('taskCount');
//         const deleteAllButton = document.getElementById('deleteAllButton');
//         const inputWrapper = document.getElementById('inputWrapper');
//         const errorMsg = document.getElementById('errorMsg');

//         // Update the counter and visibility of "Delete All"
//         function updateHeader() {
//             const totalTasks = todoList.children.length;
//             const incompleteTasks = todoList.querySelectorAll('.todo-text:not(.completed)').length;

//             taskCountLabel.innerText = `${incompleteTasks} ${incompleteTasks === 1 ? 'task' : 'tasks'} left`;
//             deleteAllButton.style.display = totalTasks > 0 ? "block" : "none";
//         }

//         function createTodoElement(text) {
//             const item = document.createElement('div');
//             item.className = "todo-item";

//             // Text Component
//             const span = document.createElement('span');
//             span.className = "todo-text";
//             span.innerText = text;
//             span.onclick = function () {
//                 span.classList.toggle('completed');
//                 updateHeader();
//             };

//             // Actions Container
//             const actions = document.createElement('div');
//             actions.className = "d-flex";

//             // Edit Button Logic
//             const editBtn = document.createElement('button');
//             editBtn.className = "btn btn-outline-secondary btn-action";
//             editBtn.innerHTML = "✎";
//             editBtn.onclick = function () {
//                 if (item.contains(span)) {
//                     const currentText = span.innerText;
//                     const input = document.createElement('input');
//                     input.type = "text";
//                     input.className = "edit-input";
//                     input.value = currentText;

//                     let isSaving = false;

//                     const saveChanges = () => {
//                         if (isSaving) return;
//                         isSaving = true;

//                         const val = input.value.trim();

//                         if (item.contains(input)) {
//                             if (val !== "") {
//                                 span.innerText = val;
//                                 item.replaceChild(span, input);
//                             } else {
//                                 item.remove();
//                                 updateHeader();
//                             }
//                         }
//                     };

//                     input.onkeydown = (e) => {
//                         if (e.key === 'Enter') {
//                             e.preventDefault();
//                             saveChanges();
//                         }
//                     };
//                     input.onblur = saveChanges;

//                     item.replaceChild(input, span);
//                     input.focus();
//                 }
//             };

//             // Delete Button Logic
//             const delBtn = document.createElement('button');
//             delBtn.className = "btn btn-outline-danger btn-action";
//             delBtn.innerHTML = "×";
//             delBtn.onclick = function () {
//                 item.remove();
//                 updateHeader();
//             };

//             actions.appendChild(editBtn);
//             actions.appendChild(delBtn);
//             item.appendChild(span);
//             item.appendChild(actions);

//             return item;
//         }

//         function addTask() {
//             const text = todoInput.value.trim();

//             if (text === "") {
//                 // Show validation error
//                 inputWrapper.classList.add('is-invalid');
//                 errorMsg.style.display = 'block';
//                 return;
//             }

//             // Hide validation error if it was showing
//             inputWrapper.classList.remove('is-invalid');
//             errorMsg.style.display = 'none';

//             const todoElement = createTodoElement(text);
//             todoList.appendChild(todoElement);

//             todoInput.value = "";
//             updateHeader();
//         }

//         // Event Listeners
//         addButton.onclick = addTask;

//         todoInput.onkeypress = (e) => {
//             if (e.key === 'Enter') addTask();
//         };

//         // Remove error formatting when user starts typing
//         todoInput.oninput = () => {
//             inputWrapper.classList.remove('is-invalid');
//             errorMsg.style.display = 'none';
//         };

//         deleteAllButton.onclick = function () {
//             todoList.innerHTML = "";
//             updateHeader();
//         };