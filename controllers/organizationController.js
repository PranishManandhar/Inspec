const { promisePool } = require('../config/database');

// ========== JURISDICTIONS ==========

const createJurisdiction = async (req, res) => {
    try {
        const { jurisdiction_name, mayor, vice_mayor, no_of_districts } = req.body;

        if (!jurisdiction_name) {
            return res.status(400).json({
                success: false,
                message: 'Jurisdiction name is required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Jurisdiction (jurisdiction_name, mayor, vice_mayor, no_of_districts)
             VALUES (?, ?, ?, ?)`,
            [jurisdiction_name, mayor, vice_mayor, no_of_districts]
        );

        res.status(201).json({
            success: true,
            message: 'Jurisdiction created successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Create jurisdiction error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const getAllJurisdictions = async (req, res) => {
    try {
        const [jurisdictions] = await promisePool.query(
            'SELECT * FROM Jurisdiction ORDER BY jurisdiction_name'
        );

        res.json({
            success: true,
            data: jurisdictions
        });

    } catch (error) {
        console.error('Get jurisdictions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ========== SCHOOLS ==========

const createSchool = async (req, res) => {
    try {
        const { school_name, school_address, jurisdiction_id } = req.body;

        if (!school_name) {
            return res.status(400).json({
                success: false,
                message: 'School name is required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO School (school_name, school_address, jurisdiction_id)
             VALUES (?, ?, ?)`,
            [school_name, school_address, jurisdiction_id]
        );

        res.status(201).json({
            success: true,
            message: 'School created successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Create school error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const getAllSchools = async (req, res) => {
    try {
        const [schools] = await promisePool.query(
            `SELECT s.*, j.jurisdiction_name
             FROM School s
             LEFT JOIN Jurisdiction j ON s.jurisdiction_id = j.jurisdiction_id
             ORDER BY s.school_name`
        );

        res.json({
            success: true,
            data: schools
        });

    } catch (error) {
        console.error('Get schools error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ========== COMPANIES ==========

const createCompany = async (req, res) => {
    try {
        const {
            company_name, company_type, company_estd_date, company_value,
            company_main_branch_jurisdiction_id, current_branch_jurisdiction_id
        } = req.body;

        if (!company_name) {
            return res.status(400).json({
                success: false,
                message: 'Company name is required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Company 
            (company_name, company_type, company_estd_date, company_value, 
             company_main_branch_jurisdiction_id, current_branch_jurisdiction_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [company_name, company_type, company_estd_date, company_value,
             company_main_branch_jurisdiction_id, current_branch_jurisdiction_id]
        );

        res.status(201).json({
            success: true,
            message: 'Company created successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Create company error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const [companies] = await promisePool.query(
            `SELECT c.*, 
                    j1.jurisdiction_name AS main_branch_jurisdiction,
                    j2.jurisdiction_name AS current_branch_jurisdiction
             FROM Company c
             LEFT JOIN Jurisdiction j1 ON c.company_main_branch_jurisdiction_id = j1.jurisdiction_id
             LEFT JOIN Jurisdiction j2 ON c.current_branch_jurisdiction_id = j2.jurisdiction_id
             ORDER BY c.company_name`
        );

        res.json({
            success: true,
            data: companies
        });

    } catch (error) {
        console.error('Get companies error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ========== HOSPITALS ==========

const createHospital = async (req, res) => {
    try {
        const {
            hospital_name, hospital_address, hospital_estd,
            hospital_director, jurisdiction_id
        } = req.body;

        if (!hospital_name) {
            return res.status(400).json({
                success: false,
                message: 'Hospital name is required'
            });
        }

        const [result] = await promisePool.query(
            `INSERT INTO Hospital 
            (hospital_name, hospital_address, hospital_estd, hospital_director, jurisdiction_id)
            VALUES (?, ?, ?, ?, ?)`,
            [hospital_name, hospital_address, hospital_estd, hospital_director, jurisdiction_id]
        );

        res.status(201).json({
            success: true,
            message: 'Hospital created successfully',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error('Create hospital error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const getAllHospitals = async (req, res) => {
    try {
        const [hospitals] = await promisePool.query(
            `SELECT h.*, j.jurisdiction_name
             FROM Hospital h
             LEFT JOIN Jurisdiction j ON h.jurisdiction_id = j.jurisdiction_id
             ORDER BY h.hospital_name`
        );

        res.json({
            success: true,
            data: hospitals
        });

    } catch (error) {
        console.error('Get hospitals error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// ========== STATISTICS ==========

const getStatistics = async (req, res) => {
    try {
        const [stats] = await promisePool.query(`
            SELECT 
                (SELECT COUNT(*) FROM Person) AS total_persons,
                (SELECT COUNT(*) FROM School) AS total_schools,
                (SELECT COUNT(*) FROM Company) AS total_companies,
                (SELECT COUNT(*) FROM Hospital) AS total_hospitals,
                (SELECT COUNT(*) FROM Jurisdiction) AS total_jurisdictions,
                (SELECT COUNT(*) FROM Person_School) AS total_education_records,
                (SELECT COUNT(*) FROM Person_Company) AS total_employment_records
        `);

        res.json({
            success: true,
            data: stats[0]
        });

    } catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    // Jurisdictions
    createJurisdiction,
    getAllJurisdictions,
    // Schools
    createSchool,
    getAllSchools,
    // Companies
    createCompany,
    getAllCompanies,
    // Hospitals
    createHospital,
    getAllHospitals,
    // Statistics
    getStatistics
};
