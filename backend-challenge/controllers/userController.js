const User = require('../models/User');

const userController = {
  // GET /api/users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener usuarios'
      });
    }
  },

  // GET /api/users/:id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener usuario'
      });
    }
  },

  // POST /api/users
  createUser: async (req, res) => {
    try {
      const { name, email, age, role } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Nombre y email son requeridos'
        });
      }

      const user = await User.create({ name, email, age, role });
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al crear usuario'
      });
    }
  },

  // PUT /api/users/:id
  updateUser: async (req, res) => {
    try {
      const { name, email, age, role } = req.body;
      const updatedUser = await User.update(req.params.id, { name, email, age, role });
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al actualizar usuario'
      });
    }
  },

  // DELETE /api/users/:id
  deleteUser: async (req, res) => {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al eliminar usuario'
      });
    }
  }
};

module.exports = userController;
