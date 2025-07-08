// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('MongoDB URI:', uri);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ Conectado exitosamente a MongoDB Atlas: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }

  // Eventos
  mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose conectado a MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Error de conexión de Mongoose:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose desconectado');
  });
};

module.exports = connectDB;
