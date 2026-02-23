-- Database Schema Based on ER Diagram
-- Person Tracking and Verification System

CREATE DATABASE IF NOT EXISTS person_tracking_system;
USE person_tracking_system;

-- Jurisdiction Table
CREATE TABLE Jurisdiction (
    jurisdiction_id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_name TEXT NOT NULL,
    mayor TEXT,
    vice_mayor TEXT,
    no_of_districts INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hospital Table
CREATE TABLE Hospital (
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_name TEXT NOT NULL,
    hospital_address TEXT,
    hospital_estd DATETIME,
    hospital_director TEXT,
    jurisdiction_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (jurisdiction_id) REFERENCES Jurisdiction(jurisdiction_id) ON DELETE SET NULL
);

-- School Table
CREATE TABLE School (
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    school_name TEXT NOT NULL,
    school_address TEXT,
    jurisdiction_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (jurisdiction_id) REFERENCES Jurisdiction(jurisdiction_id) ON DELETE SET NULL
);

-- Company Table
CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name TEXT NOT NULL,
    company_type TEXT,
    company_estd_date DATE,
    company_value TEXT,
    company_main_branch_jurisdiction_id INT,
    current_branch_jurisdiction_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_main_branch_jurisdiction_id) REFERENCES Jurisdiction(jurisdiction_id) ON DELETE SET NULL,
    FOREIGN KEY (current_branch_jurisdiction_id) REFERENCES Jurisdiction(jurisdiction_id) ON DELETE SET NULL
);

-- Person Table
CREATE TABLE Person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    contact BIGINT,
    no_of_family_members INT,
    school_id INT,
    company_id INT,
    schooling_history TEXT,
    working_history TEXT,
    jurisdiction_id INT,
    birth_hospital_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES School(school_id) ON DELETE SET NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE SET NULL,
    FOREIGN KEY (jurisdiction_id) REFERENCES Jurisdiction(jurisdiction_id) ON DELETE SET NULL,
    FOREIGN KEY (birth_hospital_id) REFERENCES Hospital(hospital_id) ON DELETE SET NULL
);

-- Login Table
CREATE TABLE Login (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Person_School Junction Table (Many-to-Many relationship)
CREATE TABLE Person_School (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    school_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES Person(id) ON DELETE CASCADE,
    FOREIGN KEY (school_id) REFERENCES School(school_id) ON DELETE CASCADE
);

-- Person_Company Junction Table (Many-to-Many relationship)
CREATE TABLE Person_Company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    company_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    position TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES Person(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

-- Person_Contact Table (One-to-Many relationship)
CREATE TABLE Person_Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    contact_number TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES Person(id) ON DELETE CASCADE
);

-- Data_logs Table
CREATE TABLE Data_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    log_text TEXT,
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log_code_string TEXT,
    status_code INT,
    source TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_person_name ON Person(name(100));
CREATE INDEX idx_person_dob ON Person(dob);
CREATE INDEX idx_person_jurisdiction ON Person(jurisdiction_id);
CREATE INDEX idx_person_school_person ON Person_School(person_id);
CREATE INDEX idx_person_school_school ON Person_School(school_id);
CREATE INDEX idx_person_company_person ON Person_Company(person_id);
CREATE INDEX idx_person_company_company ON Person_Company(company_id);
CREATE INDEX idx_person_contact_person ON Person_Contact(person_id);
CREATE INDEX idx_hospital_jurisdiction ON Hospital(jurisdiction_id);
CREATE INDEX idx_school_jurisdiction ON School(jurisdiction_id);
CREATE INDEX idx_company_jurisdiction ON Company(company_main_branch_jurisdiction_id);
CREATE INDEX idx_data_logs_timestamp ON Data_logs(log_timestamp);

-- Insert sample data for testing

-- Sample Jurisdictions
INSERT INTO Jurisdiction (jurisdiction_name, mayor, vice_mayor, no_of_districts) VALUES
('Kathmandu Metropolitan City', 'Balen Shah', 'Sunita Dangol', 32),
('Lalitpur Metropolitan City', 'Chiribabu Maharjan', 'Manjali Shakya Bajracharya', 29),
('Bhaktapur Municipality', 'Sunil Prajapati', 'Rajani Joshi', 10),
('Pokhara Metropolitan City', 'Dhanraj Acharya', 'Kopila Ranabhat', 33);

-- Sample Hospitals
INSERT INTO Hospital (hospital_name, hospital_address, hospital_estd, hospital_director, jurisdiction_id) VALUES
('Bir Hospital', 'Tundikhel, Kathmandu', '1889-01-01 00:00:00', 'Dr. Arun Kumar', 1),
('Patan Hospital', 'Lagankhel, Lalitpur', '1950-01-01 00:00:00', 'Dr. Sushma Sharma', 2),
('Bhaktapur Hospital', 'Dudhpati, Bhaktapur', '1965-01-01 00:00:00', 'Dr. Ramesh Thapa', 3),
('Manipal Teaching Hospital', 'Fulbari, Pokhara', '1994-01-01 00:00:00', 'Dr. Binod Shrestha', 4);

-- Sample Schools
INSERT INTO School (school_name, school_address, jurisdiction_id) VALUES
('Budhanilkantha School', 'Budhanilkantha, Kathmandu', 1),
('Shuvatara School', 'Patan Dhoka, Lalitpur', 2),
('Bhaktapur Multiple Campus', 'Dudhpati, Bhaktapur', 3),
('Prithvi Narayan Campus', 'Ram Ghat, Pokhara', 4),
('Tribhuvan University', 'Kirtipur, Kathmandu', 1);

-- Sample Companies
INSERT INTO Company (company_name, company_type, company_estd_date, company_value, company_main_branch_jurisdiction_id, current_branch_jurisdiction_id) VALUES
('Tech Solutions Nepal Pvt. Ltd.', 'IT Services', '2015-05-15', 'NPR 50,000,000', 1, 1),
('Himalayan Trading Company', 'Trading', '2010-03-20', 'NPR 100,000,000', 1, 2),
('Nepal Software Company', 'Software Development', '2018-07-01', 'NPR 30,000,000', 2, 2),
('Pokhara Engineering Works', 'Engineering', '2012-09-10', 'NPR 75,000,000', 4, 4);

-- Sample Persons
INSERT INTO Person (name, dob, contact, no_of_family_members, school_id, company_id, schooling_history, working_history, jurisdiction_id, birth_hospital_id) VALUES
('Ram Kumar Sharma', '1995-05-15', 9841234567, 5, 1, 1, 'Completed SLC from Budhanilkantha School', 'Working at Tech Solutions since 2020', 1, 1),
('Sita Kumari Thapa', '1998-03-20', 9851234567, 4, 2, 3, 'Bachelor from TU, +2 from Shuvatara', 'Software Developer since 2021', 2, 2),
('Hari Prasad Adhikari', '1992-11-10', 9861234567, 6, 3, 2, 'MBA from Bhaktapur Campus', 'Manager at Himalayan Trading', 3, 3),
('Gita Devi Poudel', '2000-08-25', 9871234567, 3, 4, 4, 'Engineering from Pokhara Campus', 'Engineer at Pokhara Engineering Works', 4, 4);

-- Sample Login Users
INSERT INTO Login (username, email, password_hash, role) VALUES
('admin', 'admin@system.com', '$2a$12$dbNQiwRoQlw1tuOE9h9Vl.T83f8sbuLFeosxO.pKEPnha5UDTBAC2', 'admin'),
('hr_user', 'hr@system.com', '$2a$12$dbNQiwRoQlw1tuOE9h9Vl.T83f8sbuLFeosxO.pKEPnha5UDTBAC2', 'hr'),
('verifier', 'verifier@system.com', '$2a$12$dbNQiwRoQlw1tuOE9h9Vl.T83f8sbuLFeosxO.pKEPnha5UDTBAC2', 'verifier');

-- Sample Person-School relationships
INSERT INTO Person_School (person_id, school_id, start_date, end_date, notes) VALUES
(1, 1, '2005-04-01', '2015-03-31', 'Completed SLC with distinction'),
(1, 5, '2015-04-01', '2019-03-31', 'Bachelor in Computer Application'),
(2, 2, '2008-04-01', '2018-03-31', 'SLC and +2 completed'),
(2, 5, '2018-04-01', '2022-03-31', 'Bachelor in IT'),
(3, 3, '2002-04-01', '2015-03-31', 'Completed MBA'),
(4, 4, '2010-04-01', '2022-03-31', 'Bachelor in Engineering');

-- Sample Person-Company relationships
INSERT INTO Person_Company (person_id, company_id, start_date, end_date, position) VALUES
(1, 1, '2020-01-15', NULL, 'Software Developer'),
(2, 3, '2021-06-01', NULL, 'Junior Developer'),
(3, 2, '2016-03-01', NULL, 'Sales Manager'),
(4, 4, '2022-08-01', NULL, 'Civil Engineer');

-- Sample Person-Contact relationships
INSERT INTO Person_Contact (person_id, contact_number, type) VALUES
(1, '9841234567', 'Mobile'),
(1, '01-4567890', 'Home'),
(2, '9851234567', 'Mobile'),
(2, '01-5234567', 'Office'),
(3, '9861234567', 'Mobile'),
(4, '9871234567', 'Mobile'),
(4, '061-567890', 'Office');

-- Sample Data Logs
INSERT INTO Data_logs (log_text, log_code_string, status_code, source) VALUES
('System initialized', 'SYSTEM_INIT', 200, 'System'),
('Person record created for Ram Kumar Sharma', 'PERSON_CREATE', 201, 'API'),
('Person record created for Sita Kumari Thapa', 'PERSON_CREATE', 201, 'API'),
('School relationship added', 'PERSON_SCHOOL_ADD', 201, 'API'),
('Company relationship added', 'PERSON_COMPANY_ADD', 201, 'API');

-- View to get complete person information
CREATE VIEW vw_person_complete AS
SELECT 
    p.id,
    p.name,
    p.dob,
    p.contact,
    p.no_of_family_members,
    j.jurisdiction_name,
    h.hospital_name AS birth_hospital,
    s.school_name AS current_school,
    c.company_name AS current_company,
    p.schooling_history,
    p.working_history
FROM Person p
LEFT JOIN Jurisdiction j ON p.jurisdiction_id = j.jurisdiction_id
LEFT JOIN Hospital h ON p.birth_hospital_id = h.hospital_id
LEFT JOIN School s ON p.school_id = s.school_id
LEFT JOIN Company c ON p.company_id = c.company_id;

-- View to get person's complete education history
CREATE VIEW vw_person_education AS
SELECT 
    p.id AS person_id,
    p.name AS person_name,
    s.school_name,
    ps.start_date,
    ps.end_date,
    ps.notes,
    TIMESTAMPDIFF(YEAR, ps.start_date, COALESCE(ps.end_date, CURDATE())) AS years_attended
FROM Person p
JOIN Person_School ps ON p.id = ps.person_id
JOIN School s ON ps.school_id = s.school_id
ORDER BY p.id, ps.start_date;

-- View to get person's complete employment history
CREATE VIEW vw_person_employment AS
SELECT 
    p.id AS person_id,
    p.name AS person_name,
    c.company_name,
    pc.position,
    pc.start_date,
    pc.end_date,
    CASE 
        WHEN pc.end_date IS NULL THEN 'Current'
        ELSE 'Former'
    END AS employment_status,
    TIMESTAMPDIFF(YEAR, pc.start_date, COALESCE(pc.end_date, CURDATE())) AS years_worked
FROM Person p
JOIN Person_Company pc ON p.id = pc.person_id
JOIN Company c ON pc.company_id = c.company_id
ORDER BY p.id, pc.start_date DESC;

-- View to get all contact numbers for a person
CREATE VIEW vw_person_contacts AS
SELECT 
    p.id AS person_id,
    p.name AS person_name,
    GROUP_CONCAT(CONCAT(pc.type, ': ', pc.contact_number) SEPARATOR ', ') AS all_contacts
FROM Person p
LEFT JOIN Person_Contact pc ON p.id = pc.person_id
GROUP BY p.id, p.name;

-- Stored Procedure to get complete person profile
DELIMITER //
CREATE PROCEDURE sp_get_person_profile(IN p_person_id INT)
BEGIN
    -- Basic Information
    SELECT * FROM Person WHERE id = p_person_id;
    
    -- Contact Numbers
    SELECT contact_number, type FROM Person_Contact WHERE person_id = p_person_id;
    
    -- Education History
    SELECT s.school_name, ps.start_date, ps.end_date, ps.notes
    FROM Person_School ps
    JOIN School s ON ps.school_id = s.school_id
    WHERE ps.person_id = p_person_id
    ORDER BY ps.start_date;
    
    -- Employment History
    SELECT c.company_name, pc.position, pc.start_date, pc.end_date
    FROM Person_Company pc
    JOIN Company c ON pc.company_id = c.company_id
    WHERE pc.person_id = p_person_id
    ORDER BY pc.start_date DESC;
END //
DELIMITER ;

-- Function to calculate person's age
DELIMITER //
CREATE FUNCTION fn_calculate_age(birth_date DATE) 
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, birth_date, CURDATE());
END //
DELIMITER ;

-- Trigger to log person creation
DELIMITER //
CREATE TRIGGER tr_person_created
AFTER INSERT ON Person
FOR EACH ROW
BEGIN
    INSERT INTO Data_logs (log_text, log_code_string, status_code, source)
    VALUES (
        CONCAT('New person created: ', NEW.name),
        'PERSON_CREATE',
        201,
        'TRIGGER'
    );
END //
DELIMITER ;

-- Trigger to log person updates
DELIMITER //
CREATE TRIGGER tr_person_updated
AFTER UPDATE ON Person
FOR EACH ROW
BEGIN
    INSERT INTO Data_logs (log_text, log_code_string, status_code, source)
    VALUES (
        CONCAT('Person updated: ', NEW.name),
        'PERSON_UPDATE',
        200,
        'TRIGGER'
    );
END //
DELIMITER ;

-- Display summary
SELECT 'Database schema created successfully!' AS Status;
SELECT 'Tables created:' AS Info, COUNT(*) AS Count FROM information_schema.tables WHERE table_schema = 'person_tracking_system';
SELECT 'Sample data inserted' AS Status;
