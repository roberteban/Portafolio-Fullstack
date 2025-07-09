const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  // Validar que la URI existe
  if (!uri) {
    console.error('❌ MONGODB_URI no está definida en las variables de entorno');
    process.exit(1);
  }

  // En producción, no mostrar la URI completa por seguridad
  if (process.env.NODE_ENV === 'production') {
    console.log('🔗 Conectando a MongoDB Atlas...');
  } else {
    console.log('MongoDB URI:', uri);
  }

  try {
    const conn = await mongoose.connect(uri, {
      // Configuraciones optimizadas para Render y MongoDB Atlas
      serverSelectionTimeoutMS: 10000, // 10 segundos para seleccionar servidor
      socketTimeoutMS: 45000, // 45 segundos para operaciones socket
      connectTimeoutMS: 10000, // 10 segundos para conectar
      maxPoolSize: 10, // Máximo 10 conexiones en el pool
      minPoolSize: 2, // Mínimo 2 conexiones en el pool
      maxIdleTimeMS: 30000, // Cerrar conexiones inactivas después de 30 segundos
      bufferMaxEntries: 0, // Deshabilitar mongoose buffering
      
      // Configuraciones adicionales para estabilidad
      heartbeatFrequencyMS: 10000, // Heartbeat cada 10 segundos
      family: 4, // Usar IPv4, resuelve algunos problemas de DNS
    });

    console.log(`✅ Conectado exitosamente a MongoDB Atlas: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    
    // Log más detallado en desarrollo
    if (process.env.NODE_ENV !== 'production') {
      console.error('Stack trace:', error.stack);
    }
    
    // En lugar de hacer exit inmediatamente, intentar reconectar
    console.log('🔄 Intentando reconectar en 5 segundos...');
    setTimeout(connectDB, 5000);
    return null;
  }
};

// Configurar eventos de conexión fuera de la función principal
const setupConnectionEvents = () => {
  mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose conectado a MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Error de conexión de Mongoose:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose desconectado');
    
    // Intentar reconectar en producción
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Intentando reconectar...');
      setTimeout(() => {
        mongoose.connect(process.env.MONGODB_URI);
      }, 5000);
    }
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 Mongoose reconectado a MongoDB');
  });

  // Manejo de cierre graceful
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('🛑 Conexión MongoDB cerrada debido a terminación de la aplicación');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error al cerrar conexión MongoDB:', error);
      process.exit(1);
    }
  });

  process.on('SIGTERM', async () => {
    try {
      await mongoose.connection.close();
      console.log('🛑 Conexión MongoDB cerrada debido a terminación de la aplicación');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error al cerrar conexión MongoDB:', error);
      process.exit(1);
    }
  });
};

// Función para verificar el estado de la conexión
const getConnectionStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states[mongoose.connection.readyState],
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    readyState: mongoose.connection.readyState
  };
};

// Función para reconectar manualmente si es necesario
const reconnect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('✅ Ya conectado a MongoDB');
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔄 Reconectado exitosamente a MongoDB');
  } catch (error) {
    console.error('❌ Error al reconectar a MongoDB:', error.message);
    throw error;
  }
};

// Configurar eventos al importar el módulo
setupConnectionEvents();

module.exports = {
  connectDB,
  getConnectionStatus,
  reconnect
};
