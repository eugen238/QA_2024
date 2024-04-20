let todos = [];

const addTodo = (todo) => {
    if (!todo) throw new Error("Todo cannot be empty");
    const newTodo = { id: Date.now(), text: todo, completed: false }; // Добавление поля completed со значением false
    todos.push(newTodo);
    return newTodo;
  };

const deleteTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) throw new Error("Todo not found");
  return todos.splice(index, 1)[0];
};

const getTodos = () => {
  return todos;
};
const updateTodo = (id, newText) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) throw new Error("Todo not found");
    todos[index].text = newText;
    return todos[index];
  };
  
  const toggleTodoCompletion = (id) => {
    const todo = getTodoById(id);
    if (!todo) throw new Error("Todo not found");
    todo.completed = !todo.completed;
  };
  
  const getTodoById = (id) => {
    return todos.find(todo => todo.id === id);
  };
  
  module.exports = { addTodo, deleteTodo, getTodos, updateTodo, toggleTodoCompletion, getTodoById };
  