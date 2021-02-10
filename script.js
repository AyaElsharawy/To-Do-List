//selector 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const container = document.querySelector('.todo-container');

//Event Listners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
let i=0;
function addTodo(event)
{
    //prevent form from submitting
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    savelocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //check delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('trash-btn');
    todoDiv.appendChild(deleteButton);
    //append to list 
    todoList.appendChild(todoDiv);
    //clear todo input 
    todoInput.value="";
    
    
}
function deleteCheck(e)
{
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn')
        {
            const todo= item.parentElement;
            //animation
            todo.classList.add("fall");
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', function (){
               todo.remove(); 
            });
        }
    //check maek
    if(item.classList[0] === 'complete-btn')
        {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
}
function filterTodo(e)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
       switch(e.target.value)
           {
               case "all":
                   todo.style.display = 'flex';
                   break;
               case "completed":
                   if(todo.classList.contains('completed'))
                       {
                           todo.style.display = 'flex';
                       }
                   else{
                       todo.style.display = 'none';
                   }
                   break;
               case "uncompleted":
                   if (!todo.classList.contains('completed'))
                       {
                           todo.style.display = 'flex';
                       }
                   else{
                       todo.style.display = 'none';
                   }
                   break;
                   
           }
    });
}

function savelocalTodos(todo)
{
    //check if i have already thing 
    console.log(todo);
  let todos;
    if(localStorage.getItem('todos') === null){
            todos= [];
        }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos()
{
    let todos;
    if(localStorage.getItem('todos') === null)
        {
            todos = [];
        }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
     
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText= todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('trash-btn');
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null)
        {
            todos = [];
        }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
    //here i get the name of the task
   const todoIndex = todo.children[0].innerText;
    //splace to remove the task from the todos , 1 for remove 1 item from the array 
   todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}