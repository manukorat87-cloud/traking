import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api', trackingRoutes);
app.use('/api', settingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Global error handler
app.use(errorHandler);

// Connect DB & Start Server
async function startServer() {
  try {
    await connectToDatabase();
    console.log('[Server] Connected to MongoDB ShopifyStore database.');
  } catch (error) {
    console.warn('[Server Warning] Could not connect to MongoDB initially. Will retry on request or fallback gracefully.', error);
  }

  app.listen(PORT, () => {
    console.log(`[Server] Express server running on port ${PORT} (http://localhost:${PORT})`);
  });
}

startServer();
