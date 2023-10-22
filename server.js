const express = require('express');
const app = express();
const tasks = require('./tasks');
require('dotenv').config(); // Carga las variables de entorno
const jwt = require('jsonwebtoken');

const validUsers = [
  { username: 'admin', password: '123' },
  { username: 'cliente', password: '1234' },
];

const validateMethod = (req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    return res.status(405).send('Método HTTP no permitido');
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};


app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = validUsers.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1h' });

  res.json({ token });
});

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});


app.use(validateMethod);

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

app.use(express.json());


app.use('/view', viewRouter);
app.use('/edit', editRouter);


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});