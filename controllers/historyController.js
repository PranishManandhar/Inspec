const { promisePool } = require('../config/database');

// ========== EDUCATION HISTORY ==========

// Add education record
const addEducation = async (req, res) => {
    try {
        const { person_id, school_id, start_date, end_date, notes } = req.body;

        if (!person_id || !school_id) {
            return res.status(400).json({
                success: false,
                message: 'person_id and school_id are required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Person_School (person_id, school_id, start_date, end_date, notes)
             VALUES (?, ?, ?, ?, ?)`,
            [person_id, school_id, start_date, end_date, notes]
        );

        res.status(201).json({
            success: true,
            message: 'Education record added successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Add education error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get education by person
const getEducationByPerson = async (req, res) => {
    try {
        const { person_id } = req.params;

        const [education] = await promisePool.query(
            `SELECT ps.*, s.school_name, s.school_address,
                    TIMESTAMPDIFF(YEAR, ps.start_date, COALESCE(ps.end_date, CURDATE())) AS years_attended
             FROM Person_School ps
             JOIN School s ON ps.school_id = s.school_id
             WHERE ps.person_id = ?
             ORDER BY ps.start_date DESC`,
            [person_id]
        );

        res.json({
            success: true,
            data: education
        });

    } catch (error) {
        console.error('Get education error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update education record
const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const { school_id, start_date, end_date, notes } = req.body;

        await promisePool.query(
            `UPDATE Person_School 
             SET school_id = ?, start_date = ?, end_date = ?, notes = ?
             WHERE id = ?`,
            [school_id, start_date, end_date, notes, id]
        );

        res.json({
            success: true,
            message: 'Education record updated successfully'
        });

    } catch (error) {
        console.error('Update education error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete education record
const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;

        await promisePool.query('DELETE FROM Person_School WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Education record deleted successfully'
        });

    } catch (error) {
        console.error('Delete education error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ========== EMPLOYMENT HISTORY ==========

// Add employment record
const addEmployment = async (req, res) => {
    try {
        const { person_id, company_id, start_date, end_date, position } = req.body;

        if (!person_id || !company_id) {
            return res.status(400).json({
                success: false,
                message: 'person_id and company_id are required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Person_Company (person_id, company_id, start_date, end_date, position)
             VALUES (?, ?, ?, ?, ?)`,
            [person_id, company_id, start_date, end_date, position]
        );

        res.status(201).json({
            success: true,
            message: 'Employment record added successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Add employment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get employment by person
const getEmploymentByPerson = async (req, res) => {
    try {
        const { person_id } = req.params;

        const [employment] = await promisePool.query(
            `SELECT pc.*, c.company_name, c.company_type,
                    CASE 
                        WHEN pc.end_date IS NULL THEN 'Current'
                        ELSE 'Former'
                    END AS employment_status,
                    TIMESTAMPDIFF(YEAR, pc.start_date, COALESCE(pc.end_date, CURDATE())) AS years_worked
             FROM Person_Company pc
             JOIN Company c ON pc.company_id = c.company_id
             WHERE pc.person_id = ?
             ORDER BY pc.start_date DESC`,
            [person_id]
        );

        res.json({
            success: true,
            data: employment
        });

    } catch (error) {
        console.error('Get employment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update employment record
const updateEmployment = async (req, res) => {
    try {
        const { id } = req.params;
        const { company_id, start_date, end_date, position } = req.body;

        await promisePool.query(
            `UPDATE Person_Company 
             SET company_id = ?, start_date = ?, end_date = ?, position = ?
             WHERE id = ?`,
            [company_id, start_date, end_date, position, id]
        );

        res.json({
            success: true,
            message: 'Employment record updated successfully'
        });

    } catch (error) {
        console.error('Update employment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete employment record
const deleteEmployment = async (req, res) => {
    try {
        const { id } = req.params;

        await promisePool.query('DELETE FROM Person_Company WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Employment record deleted successfully'
        });

    } catch (error) {
        console.error('Delete employment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ========== CONTACT NUMBERS ==========

// Add contact number
const addContact = async (req, res) => {
    try {
        const { person_id, contact_number, type } = req.body;

        if (!person_id || !contact_number) {
            return res.status(400).json({
                success: false,
                message: 'person_id and contact_number are required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Person_Contact (person_id, contact_number, type)
             VALUES (?, ?, ?)`,
            [person_id, contact_number, type]
        );

        res.status(201).json({
            success: true,
            message: 'Contact added successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Add contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get contacts by person
const getContactsByPerson = async (req, res) => {
    try {
        const { person_id } = req.params;

        const [contacts] = await promisePool.query(
            'SELECT * FROM Person_Contact WHERE person_id = ?',
            [person_id]
        );

        res.json({
            success: true,
            data: contacts
        });

    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update contact
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { contact_number, type } = req.body;

        await promisePool.query(
            `UPDATE Person_Contact 
             SET contact_number = ?, type = ?
             WHERE id = ?`,
            [contact_number, type, id]
        );

        res.json({
            success: true,
            message: 'Contact updated successfully'
        });

    } catch (error) {
        console.error('Update contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete contact
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        await promisePool.query('DELETE FROM Person_Contact WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    // Education
    addEducation,
    getEducationByPerson,
    updateEducation,
    deleteEducation,
    // Employment
    addEmployment,
    getEmploymentByPerson,
    updateEmployment,
    deleteEmployment,
    // Contacts
    addContact,
    getContactsByPerson,
    updateContact,
    deleteContact
};
