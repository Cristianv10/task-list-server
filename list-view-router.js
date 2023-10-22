const express = require('express');
const viewRouter = express.Router();

const validateParams = (req, res, next) => {
  const validParams = ['completado', 'pendiente'];

  if (!validParams.includes(req.params.status)) {
    return res.status(400).json({ error: 'Parámetro no válido. Use "completed" o "incomplete".' });
  }

  next(); 
};

viewRouter.use(validateParams);

viewRouter.get('/:status', (req, res) => {
  if (req.params.status == 'completado') {
    const completedTasks = tasks.filter(task => task.status === 'Completado');
    res.send(200).json(completedTasks);
  } else {
    if (req.params.status == 'pendiente') {
      const incompleteTasks = tasks.filter(task => task.status === 'No completado');
      res.send(200).json(incompleteTasks);
    } 
  }
});


module.exports = viewRouter;