const express = require('express');
const router = express.Router();
const {
    addEducation,
    getEducationByPerson,
    updateEducation,
    deleteEducation,
    addEmployment,
    getEmploymentByPerson,
    updateEmployment,
    deleteEmployment,
    addContact,
    getContactsByPerson,
    updateContact,
    deleteContact
} = require('../controllers/historyController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Education routes
router.post('/education', authorizeRoles('admin', 'hr'), addEducation);
router.get('/education/person/:person_id', getEducationByPerson);
router.put('/education/:id', authorizeRoles('admin', 'hr'), updateEducation);
router.delete('/education/:id', authorizeRoles('admin', 'hr'), deleteEducation);

// Employment routes
router.post('/employment', authorizeRoles('admin', 'hr'), addEmployment);
router.get('/employment/person/:person_id', getEmploymentByPerson);
router.put('/employment/:id', authorizeRoles('admin', 'hr'), updateEmployment);
router.delete('/employment/:id', authorizeRoles('admin', 'hr'), deleteEmployment);

// Contact routes
router.post('/contact', authorizeRoles('admin', 'hr'), addContact);
router.get('/contact/person/:person_id', getContactsByPerson);
router.put('/contact/:id', authorizeRoles('admin', 'hr'), updateContact);
router.delete('/contact/:id', authorizeRoles('admin', 'hr'), deleteContact);

module.exports = router;
