const mongoose = require('mongoose');

const getUri = () => {
  const raw = process.env.MONGO_URI;
  if (!raw) return null;
  // Strip accidental quotes from Railway copy-paste
  return raw.trim().replace(/^["']|["']$/g, '');
};

const connectOptions = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
};

let connectPromise = null;

const connectDB = async () => {
  const uri = getUri();
  if (!uri) {
    console.error('MONGO_URI is not set — add it in Railway Variables');
    return false;
  }

  if (mongoose.connection.readyState === 1) return true;

  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      await mongoose.connect(uri, connectOptions);
      console.log('MongoDB connected');
      return true;
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
      return false;
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
};

module.exports = connectDB;
