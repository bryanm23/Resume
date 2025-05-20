import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
import projectRoutes from './routes/projects.js';

// Services
import rabbitMQService from './config/rabbitmq.js';
import messageConsumer from './services/messageConsumer.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Credentials'
  ],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Cookie settings middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/projects', projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Initialize RabbitMQ connection and start message consumer
(async () => {
  try {
    await rabbitMQService.connect();
    await messageConsumer.start();
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
})();

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Closing HTTP server and RabbitMQ connection...');
  
  server.close(async () => {
    console.log('HTTP server closed.');
    await rabbitMQService.closeConnection();
    console.log('RabbitMQ connection closed.');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received. Closing HTTP server and RabbitMQ connection...');
  
  server.close(async () => {
    console.log('HTTP server closed.');
    await rabbitMQService.closeConnection();
    console.log('RabbitMQ connection closed.');
    process.exit(0);
  });
}); 