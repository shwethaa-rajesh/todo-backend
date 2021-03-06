const services = require('../services/todo.services');

const addTodo = async (req, res) => {
  try {
    const newTodoStatus = await services.addNewTodo(req.body.todocontent);
    res.json(newTodoStatus);
    res.status(200);
  } catch (e) {
    res.status(400);
    res.json(e.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const todoStatus = await services.getTodos();
    res.json(todoStatus);
    res.status(200);
  } catch (e) {
    if (e.message !== 'No todos found') {
      res.status(400);
      res.json(e.message);
    } else {
      res.status(401);
      res.json(e.message);
    }
  }
};

module.exports = {
  getTodos, addTodo,
};
