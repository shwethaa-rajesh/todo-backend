const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { todoRouter } = require('./routes/todo.routes');

env.config();

const port = process.env.PORT || 9000;
const app = express();
app.use(bodyParser.json());
app.use('/', todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
