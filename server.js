require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const { ensureDataFile } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

ensureDataFile();

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname)));

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Emmanuel Junior Boakye API',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      projects: '/api/projects'
    }
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
