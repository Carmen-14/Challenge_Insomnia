const express = require('express');
const router = express.Router();

// Rutas SIMPLES de prueba (sin controladores)
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Test User 1' }, { id: 2, name: 'Test User 2' }]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'User ' + req.params.id });
});

router.post('/', (req, res) => {
  res.status(201).json({ id: 3, ...req.body, created: true });
});

router.put('/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body, updated: true });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'User ' + req.params.id + ' deleted' });
});

module.exports = router;
