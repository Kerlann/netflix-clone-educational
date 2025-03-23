const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Base de données en mémoire pour les utilisateurs
const users = [];

// Ajouter un utilisateur admin par défaut
const createDefaultAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  users.push({
    _id: 'admin-user-id',
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    myList: [],
    createdAt: new Date()
  });
  
  console.log('Utilisateur admin par défaut créé');
};

// Créer l'utilisateur admin par défaut
createDefaultAdmin();

// Classe User qui émule le modèle Mongoose
class User {
  static async create(userData) {
    // Vérifier si l'email existe déjà
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      const error = new Error('Un utilisateur avec cet email existe déjà');
      error.statusCode = 400;
      throw error;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUser = {
      _id: uuidv4(),
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user',
      myList: [],
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    return {
      ...newUser,
      _doc: { ...newUser },
      matchPassword: async function(password) {
        return await bcrypt.compare(password, this.password);
      },
      getSignedJwtToken: function() {
        return jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET || 'secret_key_for_development',
          { expiresIn: process.env.JWT_EXPIRE || '30d' }
        );
      }
    };
  }
  
  static async findOne(filter) {
    const user = users.find(user => {
      if (filter.email && user.email === filter.email) {
        return true;
      }
      return false;
    });
    
    if (!user) return null;
    
    return {
      ...user,
      _doc: { ...user },
      select: function(fields) {
        // Si le champ password est demandé, l'inclure
        if (fields === '+password') {
          return {
            ...this,
            password: user.password,
            matchPassword: async function(password) {
              return await bcrypt.compare(password, this.password);
            }
          };
        }
        return this;
      },
      matchPassword: async function(password) {
        return await bcrypt.compare(password, user.password);
      },
      getSignedJwtToken: function() {
        return jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET || 'secret_key_for_development',
          { expiresIn: process.env.JWT_EXPIRE || '30d' }
        );
      }
    };
  }
  
  static async findById(id) {
    const user = users.find(user => user._id === id);
    if (!user) return null;
    
    return {
      ...user,
      _doc: { ...user },
      select: function(fields) {
        if (fields === '+password') {
          return {
            ...this,
            password: user.password,
            matchPassword: async function(password) {
              return await bcrypt.compare(password, this.password);
            },
            save: async function() {
              const userIndex = users.findIndex(u => u._id === this._id);
              if (userIndex !== -1) {
                users[userIndex] = { ...this };
              }
              return this;
            }
          };
        }
        return this;
      },
      matchPassword: async function(password) {
        return await bcrypt.compare(password, user.password);
      },
      getSignedJwtToken: function() {
        return jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET || 'secret_key_for_development',
          { expiresIn: process.env.JWT_EXPIRE || '30d' }
        );
      }
    };
  }
  
  static async findByIdAndUpdate(id, update, options) {
    const userIndex = users.findIndex(user => user._id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...update,
      updatedAt: new Date()
    };
    
    return {
      ...users[userIndex],
      _doc: { ...users[userIndex] },
      getSignedJwtToken: function() {
        return jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET || 'secret_key_for_development',
          { expiresIn: process.env.JWT_EXPIRE || '30d' }
        );
      }
    };
  }
}

module.exports = User;