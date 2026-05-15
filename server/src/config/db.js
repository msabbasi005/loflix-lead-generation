const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set — add it in Railway Variables');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    // Retry once after 5s (Railway / Atlas cold start)
    setTimeout(async () => {
      try {
        await mongoose.connect(uri);
        console.log('MongoDB connected (retry)');
      } catch (retryErr) {
        console.error('MongoDB retry failed:', retryErr.message);
      }
    }, 5000);
  }
};

module.exports = connectDB;
