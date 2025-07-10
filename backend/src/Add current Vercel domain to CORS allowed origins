const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const { connectDB } = require('./config/database');
const repositoryRoutes = require('./routes/repositories');
const contactRoutes = require('./routes/contact');

const app = express();

app.set('trust proxy', 1);

connectDB();

mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose desconectado');
});

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

const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  'https://velvety-kashata-99db0d.netlify.app',
  'https://portafolio-frontend.vercel.app',
  'https://portafolio-frontend-chi.vercel.app',
];

if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(
    /\.netlify\.app$/,
    /\.vercel\.app$/   
  );
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
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
  maxAge: 86400
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'production') {
  const morgan = require('morgan');
  app.use(morgan('combined'));
} else {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

app.use('/api/repositories', repositoryRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Backend API',
    version: '1.0.0',
    docs: '/api-docs',
    health: '/api/health'
  });
});

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

const gracefulShutdown = (signal) => {
  console.log(`🛑 Recibido ${signal}, cerrando servidor...`);
  mongoose.connection.close(false, () => {
    console.log('✅ MongoDB desconectado');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 Servidor iniciado en puerto ${PORT}
  📍 Entorno: ${process.env.NODE_ENV || 'development'}
  ⏰ Hora: ${new Date().toISOString()}
  `);
});

server.on('error', (error) => {
  console.error('❌ Error del servidor:', error);
});
