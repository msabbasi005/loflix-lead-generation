// MongoDB driver needs Web Crypto (missing on some Node/Railway runtimes)
const { webcrypto } = require('node:crypto');
if (!globalThis.crypto) globalThis.crypto = webcrypto;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');
const contentRoutes = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 5000;

const normalizeOrigin = (url) => (url ? url.replace(/\/$/, '') : url);

const allowedOrigins = [
  normalizeOrigin(process.env.CLIENT_URL),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(normalizeOrigin(origin))) return true;
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.vercel.app')) return true;
    if (hostname.endsWith('.netlify.app')) return true;
    if (hostname.endsWith('.railway.app')) return true;
  } catch {
    return false;
  }
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

// Malformed JSON (often from bad curl/PowerShell tests) — not a server bug
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400)) {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  next(err);
});

// Health check — tries to connect if DB dropped (Railway / Atlas)
app.get('/api/health', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    db: dbStatus,
    mongoConfigured: Boolean(process.env.MONGO_URI),
  });
});

app.get('/', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/content', contentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Listen first so platform healthchecks pass; connect MongoDB in background
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('MONGO_URI set:', Boolean(process.env.MONGO_URI));
  connectDB();
});
