const express = require('express');
const app = express();
const tasks = require('./tasks');

const validateMethod = (req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    return res.status(405).send('Método HTTP no permitido');
  }
  next();
};

app.use(validateMethod);

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

app.use(express.json());


app.use('/view', viewRouter);
app.use('/edit', editRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});