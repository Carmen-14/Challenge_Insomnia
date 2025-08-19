const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/users.json');

class User {
  static async getAll() {
    try {
      const data = await fs.readFile(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static async saveAll(users) {
    try {
      await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
      return true;
    } catch (error) {
      throw new Error('Error al guardar usuarios');
    }
  }

  static async create(userData) {
    const users = await this.getAll();
    const newUser = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await this.saveAll(users);
    return newUser;
  }

  static async findById(id) {
    const users = await this.getAll();
    return users.find(user => user.id === id);
  }

  static async update(id, userData) {
    const users = await this.getAll();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    await this.saveAll(users);
    return users[userIndex];
  }

  static async delete(id) {
    const users = await this.getAll();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    await this.saveAll(users);
    return true;
  }
}

module.exports = User;
