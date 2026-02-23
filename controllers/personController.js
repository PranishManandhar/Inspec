const { promisePool } = require('../config/database');

// Create new person
const createPerson = async (req, res) => {
    try {
        const {
            name, dob, contact, no_of_family_members,
            school_id, company_id, schooling_history, working_history,
            jurisdiction_id, birth_hospital_id
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Person 
            (name, dob, contact, no_of_family_members, school_id, company_id, 
             schooling_history, working_history, jurisdiction_id, birth_hospital_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, dob, contact, no_of_family_members, school_id, company_id,
             schooling_history, working_history, jurisdiction_id, birth_hospital_id]
        );

        res.status(201).json({
            success: true,
            message: 'Person created successfully',
            data: {
                id: result.insertId,
                name
            }
        });

    } catch (error) {
        console.error('Create person error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all persons with pagination and search
const getAllPersons = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT p.*, 
                   j.jurisdiction_name,
                   h.hospital_name AS birth_hospital,
                   s.school_name AS current_school,
                   c.company_name AS current_company
            FROM Person p
            LEFT JOIN Jurisdiction j ON p.jurisdiction_id = j.jurisdiction_id
            LEFT JOIN Hospital h ON p.birth_hospital_id = h.hospital_id
            LEFT JOIN School s ON p.school_id = s.school_id
            LEFT JOIN Company c ON p.company_id = c.company_id
        `;
        
        let countQuery = 'SELECT COUNT(*) as total FROM Person';
        const params = [];

        if (search) {
            query += ' WHERE p.name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            const searchPattern = `%${search}%`;
            params.push(searchPattern);
        }

        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [persons] = await promisePool.query(query, params);
        const [countResult] = await promisePool.query(countQuery, search ? [`%${search}%`] : []);

        res.json({
            success: true,
            data: persons,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / limit)
            }
        });

    } catch (error) {
        console.error('Get persons error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get person by ID with complete profile
const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;

        // Get person basic info
        const [persons] = await promisePool.query(
            `SELECT p.*, 
                    j.jurisdiction_name,
                    h.hospital_name AS birth_hospital,
                    s.school_name AS current_school,
                    c.company_name AS current_company
             FROM Person p
             LEFT JOIN Jurisdiction j ON p.jurisdiction_id = j.jurisdiction_id
             LEFT JOIN Hospital h ON p.birth_hospital_id = h.hospital_id
             LEFT JOIN School s ON p.school_id = s.school_id
             LEFT JOIN Company c ON p.company_id = c.company_id
             WHERE p.id = ?`,
            [id]
        );

        if (persons.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Person not found'
            });
        }

        // Get contact numbers
        const [contacts] = await promisePool.query(
            'SELECT * FROM Person_Contact WHERE person_id = ?',
            [id]
        );

        // Get education history
        const [education] = await promisePool.query(
            `SELECT ps.*, s.school_name, s.school_address
             FROM Person_School ps
             JOIN School s ON ps.school_id = s.school_id
             WHERE ps.person_id = ?
             ORDER BY ps.start_date DESC`,
            [id]
        );

        // Get employment history
        const [employment] = await promisePool.query(
            `SELECT pc.*, c.company_name, c.company_type
             FROM Person_Company pc
             JOIN Company c ON pc.company_id = c.company_id
             WHERE pc.person_id = ?
             ORDER BY pc.start_date DESC`,
            [id]
        );

        res.json({
            success: true,
            data: {
                ...persons[0],
                contacts,
                education_history: education,
                employment_history: employment
            }
        });

    } catch (error) {
        console.error('Get person error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update person
const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, dob, contact, no_of_family_members,
            school_id, company_id, schooling_history, working_history,
            jurisdiction_id, birth_hospital_id
        } = req.body;

        const [persons] = await promisePool.query(
            'SELECT id FROM Person WHERE id = ?',
            [id]
        );

        if (persons.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Person not found'
            });
        }

        await promisePool.query(
            `UPDATE Person SET 
             name = ?, dob = ?, contact = ?, no_of_family_members = ?,
             school_id = ?, company_id = ?, schooling_history = ?, working_history = ?,
             jurisdiction_id = ?, birth_hospital_id = ?
             WHERE id = ?`,
            [name, dob, contact, no_of_family_members, school_id, company_id,
             schooling_history, working_history, jurisdiction_id, birth_hospital_id, id]
        );

        res.json({
            success: true,
            message: 'Person updated successfully'
        });

    } catch (error) {
        console.error('Update person error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete person
const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;

        const [persons] = await promisePool.query(
            'SELECT id FROM Person WHERE id = ?',
            [id]
        );

        if (persons.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Person not found'
            });
        }

        await promisePool.query('DELETE FROM Person WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Person deleted successfully'
        });

    } catch (error) {
        console.error('Delete person error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get person's complete profile using stored procedure
const getPersonProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // Call stored procedure
        await promisePool.query('CALL sp_get_person_profile(?)', [id]);

        res.json({
            success: true,
            message: 'Use getPersonById endpoint for complete profile'
        });

    } catch (error) {
        console.error('Get person profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    createPerson,
    getAllPersons,
    getPersonById,
    updatePerson,
    deletePerson,
    getPersonProfile
};
