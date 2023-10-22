const express = require('express');
const tasks = require('./tasks');
const editRouter = express.Router();

editRouter.post('/create', (req, res) => {
  const taskData = req.body;
  tasks.push(taskData);
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