const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar conexión a la base de datos y rutas
const { connectDB } = require('./config/database');
const repositoryRoutes = require('./routes/repositories');
const contactRoutes = require('./routes/contact');

// Inicializar app
const app = express();

// Habilitar trust proxy para Render
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

// Middleware de seguridad mejorado
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"]
    },
  },
}));

// Configuración CORS actualizada
const allowedOrigins = [
  'http://localhost:4200',                  // Desarrollo local Angular
  'http://localhost:3000',                  // Desarrollo local alternativo
  'https://velvety-kashata-99db0d.netlify.app', // Antiguo dominio Netlify
  'https://portafolio-frontend.vercel.app',     // Nuevo dominio Vercel
  'https://portfolio.tudominio.com'             // Dominio personalizado (opcional)
];

if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(
    /\.netlify\.app$/,  // Todos los subdominios de Netlify
    /\.vercel\.app$/    // Todos los subdominios de Vercel
  );
}

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origin (Postman, apps móviles, etc.)
    if (!origin) return callback(null, true);
    
    // Verificación optimizada
    const originAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') return origin === pattern;
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    });

    originAllowed 
      ? callback(null, true)
      : callback(new Error(`Origen '${origin}' no permitido por CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400 // Cachear preflight requests por 24 horas
};

app.use(cors(corsOptions));

// Rate limiting mejorado
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Por favor intenta nuevamente más tarde'
    });
  }
});
app.use(limiter);

// Body parsers con límites
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging mejorado
if (process.env.NODE_ENV === 'production') {
  const morgan = require('morgan');
  app.use(morgan('combined'));
} else {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Rutas API
app.use('/api/repositories', repositoryRoutes);
app.use('/api/contact', contactRoutes);

// Endpoint de salud mejorado
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Backend API',
    version: '1.0.0',
    docs: '/api-docs', // Si usas Swagger
    health: '/api/health'
  });
});

// Manejo de errores mejorado
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.path} no existe`
  });
});

app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Ocurrió un error en el servidor'
    : err.message;

  res.status(statusCode).json({ 
    error: 'Error interno',
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Graceful shutdown mejorado
const gracefulShutdown = (signal) => {
  console.log(`🛑 Recibido ${signal}, cerrando servidor...`);
  mongoose.connection.close(false, () => {
    console.log('✅ MongoDB desconectado');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 Servidor iniciado en puerto ${PORT}
  📍 Entorno: ${process.env.NODE_ENV || 'development'}
  ⏰ Hora: ${new Date().toISOString()}
  `);
});

// Manejo de errores del servidor
server.on('error', (error) => {
  console.error('❌ Error del servidor:', error);
});
