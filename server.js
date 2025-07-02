require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/favicon.ico');
});

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api', authRoutes);
app.use('/api/todos', todoRoutes);

// Health check route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Favicon test route
app.get('/favicon-test', (req, res) => {
  const faviconFiles = [
    'favicon.svg',
    'favicon-16x16.svg', 
    'favicon-32x32.svg',
    'apple-touch-icon.svg',
    'safari-pinned-tab.svg',
    'favicon.ico'
  ];
  
  res.json({
    message: 'Favicon files available',
    files: faviconFiles.map(file => ({
      name: file,
      url: `${req.protocol}://${req.get('host')}/${file}`
    })),
    manifests: [
      { name: 'site.webmanifest', url: `${req.protocol}://${req.get('host')}/site.webmanifest` },
      { name: 'browserconfig.xml', url: `${req.protocol}://${req.get('host')}/browserconfig.xml` }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
