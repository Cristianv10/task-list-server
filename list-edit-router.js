const express = require('express');
const tasks = require('./tasks');
const editRouter = express.Router();

const handleErrors = (req, res, next) => {
  if (req.method === 'POST' && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
  }

  if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
  }

  if (req.method === 'POST' && (!req.body.id || !req.body.description)) {
    return res.status(400).json({ error: 'La solicitud POST debe incluir un id y una descripción' });
  }

  if (req.method === 'PUT' && (!req.body.id || !req.body.status || !['Completado', 'No completado'].includes(req.body.status))) {
    return res.status(400).json({ error: 'La solicitud PUT debe incluir un id y un estado válido (Completado o No completado)' });
  }

  next(); 
};

editRouter.use(handleErrors);

editRouter.post('/create', (req, res) => {
  const taskData = req.body;
  tasks.push({...taskData, status: taskData.status || 'No completado'});
  res.json({ message: 'Tarea creada exitosamente' });
});

editRouter.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const indexTaskToDelete = tasks.findIndex(task => task.id == id);
  if (indexTaskToDelete !== -1) {
    tasks.splice(indexTaskToDelete, 1);
    res.json({ message: 'Tarea eliminada exitosamente' });
  } else {
    res.json({ error: 'Tarea inexistente' });
  }
});

editRouter.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedTaskData = req.body; 
  const indexTaskToUpdate = tasks.findIndex(task => task.id == id);
  if (indexTaskToUpdate !== -1) {
    tasks[indexTaskToUpdate] = { ...tasks[indexTaskToUpdate], ...updatedTaskData };
    res.json({ message: 'Tarea actualizada exitosamente' });
  } else {
    res.json({ error: 'Tarea inexistente' });
  }
});

module.exports = editRouter;