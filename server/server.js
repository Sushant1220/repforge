const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const seedDemoData = require('./seed/demoData');

dotenv.config();

const app = express();

// Seed initial demo user Alex
seedDemoData();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/fitness', require('./routes/fitnessRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/nutrition', require('./routes/nutritionRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/checkin', require('./routes/checkinRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/supplements', require('./routes/supplementRoutes'));
app.use('/api/gyms', require('./routes/gymRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'FitForge AI Backend API', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`⚡ FitForge AI Express Server running on port ${PORT}`);
});
