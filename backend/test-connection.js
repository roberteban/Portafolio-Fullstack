require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Intentando conectar a:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión exitosa a MongoDB');
    await mongoose.disconnect();
    console.log('✅ Desconexión exitosa');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
};

testConnection();