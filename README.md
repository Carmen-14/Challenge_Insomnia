# 1. Primero hacer pull
git pull origin main --allow-unrelated-histories

# 2. Ver el contenido del README.md actual
Get-Content README.md

# 3. Reemplazar con TU README.md (el que te proporcioné)
@"
# 🚀 API RESTful para Gestión de Usuarios

Una API RESTful completa construida con Node.js y Express para la gestión de usuarios con operaciones CRUD, autenticación JWT y persistencia en archivo JSON.

## 📦 Características

- ✅ Operaciones CRUD completas (Create, Read, Update, Delete)
- ✅ Autenticación JWT para endpoints protegidos
- ✅ Persistencia de datos en archivo JSON
- ✅ Validación de datos y manejo de errores
- ✅ CORS habilitado
- ✅ Estructura MVC
- ✅ IDs únicos automáticos con UUID
- ✅ Timestamps automáticos (createdAt, updatedAt)

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para Node.js
- **JWT** - JSON Web Tokens para autenticación
- **UUID** - Generación de IDs únicos
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **Body-parser** - Middleware para parsing de requests

## 📋 Prerrequisitos

### Instalación de Node.js en Windows

1. **Descargar Node.js**:
   - Ve a [nodejs.org](https://nodejs.org/)
   - Descarga la **versión LTS (Recommended)**
   - Ejecuta el instalador y sigue las instrucciones

2. **Verificar instalación**:
   \`\`\`bash
   node --version
   npm --version
   \`\`\`

### Configuración de PowerShell (Windows)

Si encuentras errores de ejecución de scripts:

\`\`\`powershell
# Ejecutar PowerShell como Administrador y ejecutar:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
\`\`\`

## 🚀 Instalación y Configuración

1. **Clonar o crear el proyecto**:
   \`\`\`bash
   mkdir backend-challenge
   cd backend-challenge
   \`\`\`

2. **Inicializar proyecto Node.js**:
   \`\`\`bash
   npm init -y
   \`\`\`

3. **Instalar dependencias**:
   \`\`\`bash
   npm install express cors body-parser uuid jsonwebtoken bcryptjs
   \`\`\`

4. **Instalar dependencias de desarrollo (opcional)**:
   \`\`\`bash
   npm install --save-dev nodemon
   \`\`\`

## 📁 Estructura del Proyecto

\`\`\`
backend-challenge/
├── 📁 controllers/
│   └── userController.js    # Lógica de negocio
├── 📁 models/
│   └── User.js             # Modelo de datos
├── 📁 routes/
│   └── users.js            # Definición de rutas
├── 📁 data/
│   └── users.json          # Base de datos (JSON)
├── package.json
├── package-lock.json
└── server.js               # Servidor principal
\`\`\`

## 🔧 Configuración del Servidor

### server.js - Configuración principal
\`\`\`javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta';

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de autenticación JWT
const authenticateToken = (req, res, next) => {
  // Lógica de autenticación
};

// Routes
app.use('/api/users', userRoutes);
app.post('/api/login', loginController);

app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
});
\`\`\`

## 🌐 Endpoints Disponibles

### 🔐 Autenticación
- **POST** \`/api/login\` - Obtener token JWT

### 👥 Usuarios (CRUD)
- **GET** \`/api/users\` - Obtener todos los usuarios
- **GET** \`/api/users/:id\` - Obtener usuario por ID
- **POST** \`/api/users\` - Crear usuario **(Requiere autenticación)**
- **PUT** \`/api/users/:id\` - Actualizar usuario
- **DELETE** \`/api/users/:id\` - Eliminar usuario

## 🧪 Ejemplos de Uso

### 1. Login para obtener token
\`\`\`http
POST http://localhost:8080/api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
\`\`\`

### 2. Crear usuario (con autenticación)
\`\`\`http
POST http://localhost:8080/api/users
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "age": 30,
  "role": "user"
}
\`\`\`

### 3. Obtener todos los usuarios
\`\`\`http
GET http://localhost:8080/api/users
\`\`\`

## 🚀 Ejecución del Proyecto

### Modo desarrollo (con nodemon):
\`\`\`bash
npm run dev
\`\`\`

### Modo producción:
\`\`\`bash
npm start
\`\`\`

### Ejecución directa:
\`\`\`bash
node server.js
\`\`\`

## 📊 Persistencia de Datos

Los datos se guardan automáticamente en \`data/users.json\`:
\`\`\`json
[
  {
    "id": "1",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "age": 30,
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
\`\`\`

## 🐛 Solución de Problemas Comunes

### Error: "No se puede cargar el archivo npm.ps1"
\`\`\`powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
\`\`\`

### Error: Puerto ya en uso
\`\`\`bash
# Encontrar proceso usando el puerto
netstat -ano | findstr :8080

# Terminar proceso
taskkill /PID <PID> /F
\`\`\`

### Error: Módulos no encontrados
\`\`\`bash
# Reinstalar dependencias
rm -rf node_modules
rm package-lock.json
npm install
\`\`\`

## 📝 Scripts de Package.json

\`\`\`json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la sección de 🐛 Solución de Problemas
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de estar usando Node.js LTS

---

**¡Desarrollado con ❤️ usando Node.js y Express!**
"@ | Out-File -Encoding utf8 README.md -Force

# 4. Agregar el README actualizado
git add README.md

# 5. Hacer commit del merge
git commit -m "Merge remote changes and update README.md"

# 6. Hacer push
git push -u origin main
