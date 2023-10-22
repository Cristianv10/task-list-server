const express = require('express');
const viewRouter = express.Router();

viewRouter.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.status === 'Completado');
  res.json(completedTasks);
});

viewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => task.status === 'No completado');
  res.json(incompleteTasks);
});

module.exports = viewRouter;