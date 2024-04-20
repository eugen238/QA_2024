const { addTodo, deleteTodo, getTodos, updateTodo, toggleTodoCompletion, getTodoById } = require('./todo');

describe('Todo Operations', () => {
  beforeEach(() => {
    // Очищаем список дел перед каждым тестом
    while(getTodos().length > 0) {
      deleteTodo(getTodos()[0].id);
    }
  });

  test('Add a todo', () => {
    const todo = addTodo('New Todo');
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('text', 'New Todo');
    expect(getTodos()).toContainEqual(todo);
  });

  test('Delete a todo', () => {
    const todo = addTodo('Todo to be deleted');
    expect(getTodos()).toContainEqual(todo);
    const deletedTodo = deleteTodo(todo.id);
    expect(deletedTodo).toBe(todo);
    expect(getTodos()).not.toContainEqual(todo);
  });

  test('Throw an exception when deleting a non-existent todo', () => {
    expect(() => deleteTodo(999)).toThrow('Todo not found');
  });

  test('Add a todo without text should throw error', () => {
    expect(() => addTodo()).toThrow('Todo cannot be empty');
  });

  test('Get all todos', () => {
    const todo1 = addTodo('First todo');
    const todo2 = addTodo('Second todo');
    expect(getTodos()).toEqual(expect.arrayContaining([todo1, todo2]));
  });

  test('Update a todo', () => {
    const todo = addTodo('Update Me');
    const updatedTodo = updateTodo(todo.id, 'Updated Todo');
    expect(updatedTodo).toHaveProperty('id', todo.id);
    expect(updatedTodo).toHaveProperty('text', 'Updated Todo');
  });
  
  test('Throw an exception when updating a non-existent todo', () => {
    expect(() => updateTodo(999, 'Update Me')).toThrow('Todo not found');
  });
  
  test('Toggle todo completion status', () => {
    const todo = addTodo('Toggle Me');
    expect(todo.completed).toBe(false);
    toggleTodoCompletion(todo.id);
    expect(getTodoById(todo.id).completed).toBe(true);
  });
  
  test('Throw an exception when toggling completion of a non-existent todo', () => {
    expect(() => toggleTodoCompletion(999)).toThrow('Todo not found');
  });
  
  test('Get todo by ID', () => {
    const todo = addTodo('Find Me');
    const foundTodo = getTodoById(todo.id);
    expect(foundTodo).toEqual(todo);
  });
  
});
