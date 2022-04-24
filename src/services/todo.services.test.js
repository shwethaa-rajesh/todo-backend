const services = require('./todo.services');
const { Todos } = require('../../models');

describe('getTodos Function', () => {
  it('should return all the todos from the database', async () => {
    jest.spyOn(Todos, 'findAll').mockResolvedValue([{
      id: 1, todocontent: 'Todo1',
    }, {
      id: 2, todocontent: 'Todo2',
    }]);
    expect(await services.getTodos()).toEqual([{
      id: 1, todocontent: 'Todo1',
    }, {
      id: 2, todocontent: 'Todo2',
    }]);
  });
  it('should throw error if some internal error', async () => {
    jest.spyOn(Todos, 'findAll').mockRejectedValue(new Error('Some error!'));
    try {
      await services.getTodos();
    } catch (err) {
      expect(err.message).toBe('Some error!');
    }
  });
  it('should throw error if no todos where found ', async () => {
    jest.spyOn(Todos, 'findAll').mockResolvedValue([]);
    try {
      await services.getTodos();
    } catch (err) {
      expect(err.message).toBe('No todos found');
    }
  });
});

describe('addNewTodo Function', () => {
  it('should add a new todos to the database', async () => {
    jest.spyOn(Todos, 'create').mockResolvedValue({
      id: 1, todocontent: 'Todo1',
    });
    expect(await services.addNewTodo('Todo1')).toEqual({
      id: 1, todocontent: 'Todo1',
    });
  });
  it('should throw error if some internal error', async () => {
    jest.spyOn(Todos, 'create').mockRejectedValue(new Error('Some error!'));
    try {
      await services.addNewTodo('1');
    } catch (err) {
      expect(err.message).toBe('Some error!');
    }
  });
  it('should throw error if no text is given ', async () => {
    try {
      await services.addNewTodo();
    } catch (err) {
      expect(err.message).toBe('Text cannot be empty');
    }
  });
  it('should throw error if text is not a string ', async () => {
    try {
      await services.addNewTodo(1);
    } catch (err) {
      expect(err.message).toBe('Text should be a string');
    }
  });
});
