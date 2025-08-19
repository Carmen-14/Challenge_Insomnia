const express = require('express');
const app = express();
const PORT = 3000;

// Middleware básico
app.use(express.json());

// Ruta SIMPLE de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Servidor funciona correctamente', timestamp: new Date().toISOString() });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando', version: '1.0' });
});

app.listen(PORT, () => {
  console.log('🚀 Servidor mínimo funcionando en http://localhost:' + PORT);
});
