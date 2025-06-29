import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import testSuitesRouter from './routes/testSuites';
import analyticsRouter from './routes/analytics';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('🏥 Health check called');
  res.json({ 
    success: true,
    data: {
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'TestPulse AI Backend',
      port: PORT
    }
  });
});

// Test endpoint for debugging
app.get('/test', (req, res) => {
  console.log('🧪 Test endpoint called');
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/test-suites', testSuitesRouter);
app.use('/api/analytics', analyticsRouter);

// API info endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'TestPulse AI API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      testSuites: '/api/test-suites',
      analytics: '/api/analytics',
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TestPulse AI Backend running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
