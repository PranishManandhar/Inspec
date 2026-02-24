const { promisePool } = require('../config/database');

// Create new log entry
const createLog = async (req, res) => {
    try {
        const { log_text, log_code_string, status_code, source } = req.body;

        if (!log_text) {
            return res.status(400).json({
                success: false,
                message: 'log_text is required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Data_logs (log_text, log_code_string, status_code, source)
             VALUES (?, ?, ?, ?)`,
            [log_text, log_code_string, status_code, source]
        );

        res.status(201).json({
            success: true,
            message: 'Log entry created successfully',
            data: {
                log_id: result.insertId,
                log_text,
                log_code_string,
                status_code,
                source
            }
        });

    } catch (error) {
        console.error('Create log error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all logs with pagination and filtering
const getAllLogs = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            source = '',
            status_code = '',
            log_code = '',
            start_date = '',
            end_date = ''
        } = req.query;

        const offset = (page - 1) * limit;
        let query = 'SELECT * FROM Data_logs WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM Data_logs WHERE 1=1';
        const params = [];
        const countParams = [];

        // Filter by source
        if (source) {
            query += ' AND source LIKE ?';
            countQuery += ' AND source LIKE ?';
            const sourcePattern = `%${source}%`;
            params.push(sourcePattern);
            countParams.push(sourcePattern);
        }

        // Filter by status code
        if (status_code) {
            query += ' AND status_code = ?';
            countQuery += ' AND status_code = ?';
            params.push(parseInt(status_code));
            countParams.push(parseInt(status_code));
        }

        // Filter by log code
        if (log_code) {
            query += ' AND log_code_string LIKE ?';
            countQuery += ' AND log_code_string LIKE ?';
            const codePattern = `%${log_code}%`;
            params.push(codePattern);
            countParams.push(codePattern);
        }

        // Filter by date range
        if (start_date) {
            query += ' AND log_timestamp >= ?';
            countQuery += ' AND log_timestamp >= ?';
            params.push(start_date);
            countParams.push(start_date);
        }

        if (end_date) {
            query += ' AND log_timestamp <= ?';
            countQuery += ' AND log_timestamp <= ?';
            params.push(end_date);
            countParams.push(end_date);
        }

        // Order by most recent first
        query += ' ORDER BY log_timestamp DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [logs] = await promisePool.query(query, params);
        const [countResult] = await promisePool.query(countQuery, countParams);

        res.json({
            success: true,
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get log by ID
const getLogById = async (req, res) => {
    try {
        const { id } = req.params;

        const [logs] = await promisePool.query(
            'SELECT * FROM Data_logs WHERE log_id = ?',
            [id]
        );

        if (logs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Log entry not found'
            });
        }

        res.json({
            success: true,
            data: logs[0]
        });

    } catch (error) {
        console.error('Get log error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get logs by source
const getLogsBySource = async (req, res) => {
    try {
        const { source } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const [logs] = await promisePool.query(
            `SELECT * FROM Data_logs 
             WHERE source = ? 
             ORDER BY log_timestamp DESC 
             LIMIT ? OFFSET ?`,
            [source, parseInt(limit), parseInt(offset)]
        );

        const [countResult] = await promisePool.query(
            'SELECT COUNT(*) as total FROM Data_logs WHERE source = ?',
            [source]
        );

        res.json({
            success: true,
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('Get logs by source error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get logs by status code
const getLogsByStatusCode = async (req, res) => {
    try {
        const { status_code } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const [logs] = await promisePool.query(
            `SELECT * FROM Data_logs 
             WHERE status_code = ? 
             ORDER BY log_timestamp DESC 
             LIMIT ? OFFSET ?`,
            [parseInt(status_code), parseInt(limit), parseInt(offset)]
        );

        const [countResult] = await promisePool.query(
            'SELECT COUNT(*) as total FROM Data_logs WHERE status_code = ?',
            [parseInt(status_code)]
        );

        res.json({
            success: true,
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('Get logs by status code error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get logs by date range
const getLogsByDateRange = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        if (!start_date || !end_date) {
            return res.status(400).json({
                success: false,
                message: 'start_date and end_date are required'
            });
        }

        const [logs] = await promisePool.query(
            `SELECT * FROM Data_logs 
             WHERE log_timestamp BETWEEN ? AND ? 
             ORDER BY log_timestamp DESC 
             LIMIT ? OFFSET ?`,
            [start_date, end_date, parseInt(limit), parseInt(offset)]
        );

        const [countResult] = await promisePool.query(
            'SELECT COUNT(*) as total FROM Data_logs WHERE log_timestamp BETWEEN ? AND ?',
            [start_date, end_date]
        );

        res.json({
            success: true,
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('Get logs by date range error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get log statistics
const getLogStatistics = async (req, res) => {
    try {
        const [stats] = await promisePool.query(`
            SELECT 
                COUNT(*) AS total_logs,
                COUNT(DISTINCT source) AS unique_sources,
                COUNT(DISTINCT status_code) AS unique_status_codes,
                MIN(log_timestamp) AS oldest_log,
                MAX(log_timestamp) AS newest_log
            FROM Data_logs
        `);

        // Get logs count by source
        const [sourceStats] = await promisePool.query(`
            SELECT source, COUNT(*) AS count
            FROM Data_logs
            GROUP BY source
            ORDER BY count DESC
        `);

        // Get logs count by status code
        const [statusStats] = await promisePool.query(`
            SELECT status_code, COUNT(*) AS count
            FROM Data_logs
            GROUP BY status_code
            ORDER BY status_code
        `);

        // Get logs count by day (last 7 days)
        const [dailyStats] = await promisePool.query(`
            SELECT 
                DATE(log_timestamp) AS date,
                COUNT(*) AS count
            FROM Data_logs
            WHERE log_timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(log_timestamp)
            ORDER BY date DESC
        `);

        res.json({
            success: true,
            data: {
                overall: stats[0],
                by_source: sourceStats,
                by_status_code: statusStats,
                last_7_days: dailyStats
            }
        });

    } catch (error) {
        console.error('Get log statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update log entry
const updateLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { log_text, log_code_string, status_code, source } = req.body;

        // Check if log exists
        const [logs] = await promisePool.query(
            'SELECT log_id FROM Data_logs WHERE log_id = ?',
            [id]
        );

        if (logs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Log entry not found'
            });
        }

        await promisePool.query(
            `UPDATE Data_logs 
             SET log_text = ?, log_code_string = ?, status_code = ?, source = ?
             WHERE log_id = ?`,
            [log_text, log_code_string, status_code, source, id]
        );

        res.json({
            success: true,
            message: 'Log entry updated successfully'
        });

    } catch (error) {
        console.error('Update log error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete log entry
const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;

        const [logs] = await promisePool.query(
            'SELECT log_id FROM Data_logs WHERE log_id = ?',
            [id]
        );

        if (logs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Log entry not found'
            });
        }

        await promisePool.query('DELETE FROM Data_logs WHERE log_id = ?', [id]);

        res.json({
            success: true,
            message: 'Log entry deleted successfully'
        });

    } catch (error) {
        console.error('Delete log error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete logs older than specified days
const deleteOldLogs = async (req, res) => {
    try {
        const { days } = req.params;

        if (!days || isNaN(days)) {
            return res.status(400).json({
                success: false,
                message: 'Valid number of days is required'
            });
        }

        const [result] = await promisePool.query(
            `DELETE FROM Data_logs 
             WHERE log_timestamp < DATE_SUB(NOW(), INTERVAL ? DAY)`,
            [parseInt(days)]
        );

        res.json({
            success: true,
            message: `Deleted logs older than ${days} days`,
            data: {
                deleted_count: result.affectedRows
            }
        });

    } catch (error) {
        console.error('Delete old logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Search logs
const searchLogs = async (req, res) => {
    try {
        const { query, page = 1, limit = 20 } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const offset = (page - 1) * limit;
        const searchPattern = `%${query}%`;

        const [logs] = await promisePool.query(
            `SELECT * FROM Data_logs 
             WHERE log_text LIKE ? 
                OR log_code_string LIKE ? 
                OR source LIKE ?
             ORDER BY log_timestamp DESC 
             LIMIT ? OFFSET ?`,
            [searchPattern, searchPattern, searchPattern, parseInt(limit), parseInt(offset)]
        );

        const [countResult] = await promisePool.query(
            `SELECT COUNT(*) as total FROM Data_logs 
             WHERE log_text LIKE ? 
                OR log_code_string LIKE ? 
                OR source LIKE ?`,
            [searchPattern, searchPattern, searchPattern]
        );

        res.json({
            success: true,
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('Search logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
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
};
