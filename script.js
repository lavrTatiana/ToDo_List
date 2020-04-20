'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const dataUpdateToLocalS = function() {
  localStorage.setItem('localData', JSON.stringify(todoData));
  console.log(localStorage.getItem('localData'));
  
};

// Function for btn Remove
const itemRemove = function(elem) {
  const item = elem.parentNode.parentNode,
        itemParent = item.parentNode,
        id = itemParent.id,
        text = item.textContent;
  
  itemParent.removeChild(item);  
  // dataUpdateToLocalS();    
};

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item){
    if (item.value !== '') {
      
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
        itemRemove(event.target);
        item.value = '';
        dataUpdateToLocalS();
      });

    }
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

  render();
  dataUpdateToLocalS();
});

render();