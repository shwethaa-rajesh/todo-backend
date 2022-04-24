const { Todos } = require('../../models');

const addNewTodo = async (text) => {
  if (!text) {
    throw new Error('Text cannot be empty');
  }
  if (typeof text !== 'string') {
    throw new Error('Text should be a string');
  }
  const newTodo = await Todos.create({
    note: text,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newTodo;
};
const getTodos = async () => {
  const todo = await Todos.findAll({ });
  if (todo.length === 0) {
    throw new Error('No todos found');
  }
  return todo;
};

module.exports = {
  getTodos, addNewTodo,
};
