const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/test-routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'API RESTful para gestión de usuarios',
    endpoints: {
      GET: '/api/users',
      POST: '/api/users',
      GET: '/api/users/:id',
      PUT: '/api/users/:id',
      DELETE: '/api/users/:id'
    }
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: 'La ruta solicitada no existe'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});
