const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-super-segura-aqui';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token de acceso requerido'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Token inválido o expirado'
      });
    }
    req.user = user;
    next();
  });
};

// Aplicar autenticación solo a POST /api/users
app.use('/api/users', (req, res, next) => {
  if (req.method === 'POST') {
    authenticateToken(req, res, next);
  } else {
    next();
  }
});

// Routes
app.use('/api/users', userRoutes);

// Nueva ruta para login (generar tokens)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Usuario hardcodeado para pruebas (en producción usar base de datos)
  if (username === 'admin' && password === 'password123') {
    const token = jwt.sign(
      { userId: 1, username: 'admin', role: 'administrator' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Login exitoso',
      token: token,
      user: {
        id: 1,
        username: 'admin',
        role: 'administrator'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Credenciales inválidas'
    });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'API RESTful para gestión de usuarios',
    endpoints: {
      'POST /api/login': 'Obtener token JWT',
      'GET /api/users': 'Obtener todos los usuarios (público)',
      'POST /api/users': 'Crear usuario (requiere autenticación)',
      'GET /api/users/:id': 'Obtener usuario por ID (público)',
      'PUT /api/users/:id': 'Actualizar usuario (público)',
      'DELETE /api/users/:id': 'Eliminar usuario (público)'
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
  console.log('JWT Secret:', JWT_SECRET);
});
