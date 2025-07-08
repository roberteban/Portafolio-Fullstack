const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('MongoDB URI:', process.env.MONGODB_URI); // Para debug

// Importar conexión a la base de datos y rutas
const connectDB = require('./config/database');
const repositoryRoutes = require('./routes/repositories');
const contactRoutes = require('./routes/contact');

// Inicializar app
const app = express();

// Habilitar trust proxy para Render u otros entornos con proxy
app.set('trust proxy', 1);

// Conectar a MongoDB Atlas
connectDB();

// Event listeners para monitorear la conexión
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose desconectado');
});

// Middleware de seguridad
app.use(helmet());

// CORS: permite acceso desde frontend local o dominio en producción
app.use(cors({
  origin: ['http://localhost:4200']
}));

// Limita número de peticiones para evitar abuso
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máx 100 peticiones por IP cada 15 min
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Parsear JSON y formularios con tamaño limitado
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/repositories', repositoryRoutes);
app.use('/api/contact', contactRoutes);

// Ruta de prueba de vida (salud del servidor)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
