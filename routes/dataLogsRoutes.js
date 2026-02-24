const express = require('express');
const router = express.Router();
const {
    createLog,
    getAllLogs,
    getLogById,
    getLogsBySource,
    getLogsByStatusCode,
    getLogsByDateRange,
    getLogStatistics,
    updateLog,
    deleteLog,
    deleteOldLogs,
    searchLogs
} = require('../controllers/dataLogsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Create log (admin and hr only)
router.post('/', authorizeRoles('admin', 'hr'), createLog);

// Get all logs with filtering and pagination (all authenticated users)
router.get('/', getAllLogs);

// Search logs
router.get('/search', searchLogs);

// Get log statistics (all authenticated users)
router.get('/statistics', getLogStatistics);

// Get logs by date range
router.get('/date-range', getLogsByDateRange);

// Get logs by source
router.get('/source/:source', getLogsBySource);

// Get logs by status code
router.get('/status/:status_code', getLogsByStatusCode);

// Get specific log by ID
router.get('/:id', getLogById);

// Update log (admin only)
router.put('/:id', authorizeRoles('admin'), updateLog);

// Delete specific log (admin only)
router.delete('/:id', authorizeRoles('admin'), deleteLog);

// Delete old logs (admin only)
router.delete('/cleanup/:days', authorizeRoles('admin'), deleteOldLogs);

module.exports = router;
