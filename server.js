const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const personRoutes = require('./routes/personRoutes');
const historyRoutes = require('./routes/historyRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const dataLogsRoutes = require('./routes/dataLogsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/logs', dataLogsRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Person Tracking System API is running',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Person Tracking System API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            persons: '/api/persons',
            history: '/api/history',
            organizations: '/api/organizations',
            logs: '/api/logs'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Multer file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size too large. Maximum size is 5MB'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.error('⚠️  Warning: Database connection failed. Please check your database configuration.');
            console.log('Server will start anyway, but database operations will fail.');
        }

        app.listen(PORT, () => {
            console.log('\n' + '='.repeat(60));
            console.log('🚀 Person Tracking System API Server');
            console.log('='.repeat(60));
            console.log(`✅ Server is running on port ${PORT}`);
            console.log(`🌐 API URL: http://localhost:${PORT}`);
            console.log(`📝 Health Check: http://localhost:${PORT}/api/health`);
            console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('\n📋 Available Endpoints:');
            console.log('   - Authentication: /api/auth');
            console.log('   - Persons: /api/persons');
            console.log('   - History: /api/history');
            console.log('   - Organizations: /api/organizations');
            console.log('   - Data Logs: /api/logs');
            console.log('='.repeat(60) + '\n');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
