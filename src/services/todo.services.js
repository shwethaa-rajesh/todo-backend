const { Todos } = require('../../models');

const addNewTodo = async (text) => {
  if (!text) {
    throw new Error('Text cannot be empty');
  }
  if (typeof text !== 'string') {
    throw new Error('Text should be a string');
  }
  const newTweet = await Todos.create({
    note: text,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newTweet;
};
const getTodos = async () => {
  const tweets = await Todos.findAll({ });
  return tweets;
};

module.exports = {
  getTodos, addNewTodo,
};
