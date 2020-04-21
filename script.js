'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
let data;

if (localStorage.getItem('localData')) {
  todoData = JSON.parse(localStorage.getItem('localData'));
}

const dataUpdateToLocalS = function() {
  localStorage.setItem('localData', JSON.stringify(todoData));
  console.log(localStorage.getItem('localData'));
  
};

// Function for btn Remove
const itemRemove = function(elem, index) {
  const item = elem.parentNode.parentNode,
        itemParent = item.parentNode,
        text = item.querySelector('span').textContent;

  todoData.splice(index, 1);
  
  dataUpdateToLocalS();
  itemParent.removeChild(item);  
    
};

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, index){
        
    // Creation new element 
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';
    
    // Compare by btn Complete
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    
    // Button Complete
    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      render(); 
      dataUpdateToLocalS();
    });

    // Button Remove
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function(event){
      itemRemove(event.target, index);
    
    });
  });

}; 


// Reaction btn plus, pushing new element
todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value, 
    completed: false
  };

  if (newTodo.value !== ''){
    todoData.push(newTodo);
    headerInput.value = '';
  }
  
  dataUpdateToLocalS();
  render();
  
});

render();