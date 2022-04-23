const express = require('express');
const {
  getTodos, addTodo,
} = require('../handlers/todo.handlers');

const todoRouter = express.Router();
todoRouter.get('/all-todos', getTodos);
todoRouter.post('/add-todo', addTodo);
module.exports = {
  todoRouter,
};
