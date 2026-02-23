const express = require('express');
const router = express.Router();
const {
    createPerson,
    getAllPersons,
    getPersonById,
    updatePerson,
    deletePerson,
    getPersonProfile
} = require('../controllers/personController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

router.post('/', authorizeRoles('admin', 'hr'), createPerson);
router.get('/', getAllPersons);
router.get('/:id', getPersonById);
router.get('/:id/profile', getPersonProfile);
router.put('/:id', authorizeRoles('admin', 'hr'), updatePerson);
router.delete('/:id', authorizeRoles('admin'), deletePerson);

module.exports = router;
