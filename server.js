const express = require('express');
const app = express();
const tasks = require('./tasks');

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