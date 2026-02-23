const express = require('express');
const router = express.Router();
const {
    createJurisdiction,
    getAllJurisdictions,
    createSchool,
    getAllSchools,
    createCompany,
    getAllCompanies,
    createHospital,
    getAllHospitals,
    getStatistics
} = require('../controllers/organizationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Jurisdiction routes
router.post('/jurisdictions', authorizeRoles('admin'), createJurisdiction);
router.get('/jurisdictions', getAllJurisdictions);

// School routes
router.post('/schools', authorizeRoles('admin', 'hr'), createSchool);
router.get('/schools', getAllSchools);

// Company routes
router.post('/companies', authorizeRoles('admin', 'hr'), createCompany);
router.get('/companies', getAllCompanies);

// Hospital routes
router.post('/hospitals', authorizeRoles('admin', 'hr'), createHospital);
router.get('/hospitals', getAllHospitals);

// Statistics
router.get('/statistics', getStatistics);

module.exports = router;
