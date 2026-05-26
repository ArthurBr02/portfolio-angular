import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import { env } from './config/env';
import { getDb } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import { seedAdminUser } from './services/authService';

// Import routes
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import projectsRoutes from './routes/projects';
import experiencesRoutes from './routes/experiences';
import educationRoutes from './routes/education';
import skillsRoutes from './routes/skills';
import translationsRoutes from './routes/translations';
import settingsRoutes from './routes/settings';
import contactRoutes from './routes/contact';
import messagesRoutes from './routes/messages';
import analyticsRoutes from './routes/analytics';
import uploadRoutes from './routes/upload';

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow loading images from other origins like frontend dev server
}));
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', projectsRoutes);
app.use('/api', experiencesRoutes);
app.use('/api', educationRoutes);
app.use('/api', skillsRoutes);
app.use('/api', translationsRoutes);
app.use('/api', settingsRoutes);
app.use('/api', contactRoutes);
app.use('/api', messagesRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', uploadRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Initialize DB and start server
async function startServer() {
  try {
    getDb(); // This will auto-run migrations
    await seedAdminUser();
    
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
