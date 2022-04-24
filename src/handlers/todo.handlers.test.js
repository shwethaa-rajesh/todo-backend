const handlers = require('./todo.handlers');
const services = require('../services/todo.services');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getTodos Function', () => {
  it('should send 401 response status if todos are not found', async () => {
    jest.spyOn(services, 'getTodos').mockRejectedValue(new Error('No todos found'));
    const res = mockResponse();
    await handlers.getTodos('', res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith('No todos found');
  });
  it('should send 200 response status if todos are returned ', async () => {
    const todos = [{
      id: 1, todocontent: 'Todo1',
    }, {
      id: 2, todocontent: 'Todo2',
    }];
    jest.spyOn(services, 'getTodos').mockResolvedValue(todos);
    const res = mockResponse();
    await handlers.getTodos('', res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(todos);
  });
  it('should send 400 response status if some error is thrown', async () => {
    jest.spyOn(services, 'getTodos').mockRejectedValue(new Error('Some error!'));
    const res = mockResponse();
    await handlers.getTodos('', res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Some error!');
  });
});

describe('addNewTodo Function', () => {
  it('should send 200 response status if todos are added ', async () => {
    const todos = {
      id: 1, todocontent: 'Todo1',
    };
    jest.spyOn(services, 'addNewTodo').mockResolvedValue(todos);
    const res = mockResponse();
    await handlers.addTodo({ body: { todocontent: 'A' } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(todos);
  });
  it('should send 400 response status if some error is thrown', async () => {
    jest.spyOn(services, 'addNewTodo').mockRejectedValue(new Error('Some error!'));
    const res = mockResponse();
    await handlers.addTodo({ body: { todocontent: 'A' } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Some error!');
  });
});
