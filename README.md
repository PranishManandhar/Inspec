# Person Tracking System - Backend API

A comprehensive Node.js backend system for tracking persons, their education history, employment history, and relationships with schools, companies, hospitals, and jurisdictions.

## 🌟 Features

- ✅ **Person Management** - Complete CRUD operations for person records
- ✅ **Education History** - Track schooling from primary to university
- ✅ **Employment History** - Track complete work experience
- ✅ **Contact Management** - Multiple contact numbers per person
- ✅ **Organization Management** - Schools, Companies, Hospitals, Jurisdictions
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Admin, HR, Verifier, User roles
- ✅ **Activity Logging** - Complete audit trail
- ✅ **Advanced Views** - Pre-built database views for complex queries
- ✅ **Stored Procedures** - Optimized database operations

## 📋 System Components

### 10 Main Entities:
1. **Person** - Individual records
2. **Jurisdiction** - Cities/Municipalities (e.g., Kathmandu, Lalitpur)
3. **Hospital** - Birth hospitals
4. **School** - Educational institutions
5. **Company** - Employers/Organizations
6. **Login** - User authentication
7. **Person_School** - Education history (many-to-many)
8. **Person_Company** - Employment history (many-to-many)
9. **Person_Contact** - Multiple contact numbers
10. **Data_logs** - System activity logging

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Environment Variables**: dotenv

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
cd person-tracking-backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=person_tracking_system
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Step 3: Set Up the Database

```bash
mysql -u root -p < database/schema.sql
```

This will:
- Create `person_tracking_system` database
- Create all 10 tables with relationships
- Insert sample data (4 persons, 4 jurisdictions, schools, companies, hospitals)
- Create 4 views for complex queries
- Create 1 stored procedure
- Create 1 function
- Create 2 triggers
- Create default login users

### Step 4: Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## 🔐 Default Credentials

```
Admin:
Email: admin@system.com
Password: admin123

HR User:
Email: hr@system.com
Password: admin123

Verifier:
Email: verifier@system.com
Password: admin123
```

⚠️ **Change these passwords in production!**

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require JWT token:
```
Authorization: Bearer <your_jwt_token>
```

---

## API Endpoints

### 1. Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Roles**: `admin`, `hr`, `verifier`, `user`

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@system.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@system.com",
      "role": "admin"
    }
  }
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

---

### 2. Person Endpoints

#### Create Person
```http
POST /api/persons
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ram Kumar Sharma",
  "dob": "1995-05-15",
  "contact": 9841234567,
  "no_of_family_members": 5,
  "school_id": 1,
  "company_id": 1,
  "schooling_history": "Completed SLC and +2",
  "working_history": "3 years experience",
  "jurisdiction_id": 1,
  "birth_hospital_id": 1
}
```

#### Get All Persons
```http
GET /api/persons?page=1&limit=10&search=Ram
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by name

#### Get Person by ID
```http
GET /api/persons/1
Authorization: Bearer <token>
```

Returns complete profile including:
- Basic information
- Current jurisdiction, school, company, birth hospital
- All contact numbers
- Complete education history
- Complete employment history

#### Update Person
```http
PUT /api/persons/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ram Kumar Sharma",
  "dob": "1995-05-15",
  ...
}
```

#### Delete Person
```http
DELETE /api/persons/1
Authorization: Bearer <token>
```

---

### 3. Education History Endpoints

#### Add Education
```http
POST /api/history/education
Authorization: Bearer <token>
Content-Type: application/json

{
  "person_id": 1,
  "school_id": 5,
  "start_date": "2015-04-01",
  "end_date": "2019-03-31",
  "notes": "Bachelor in Computer Application"
}
```

#### Get Education by Person
```http
GET /api/history/education/person/1
Authorization: Bearer <token>
```

Returns all education records with:
- School name and address
- Start and end dates
- Years attended (calculated)
- Notes

#### Update Education
```http
PUT /api/history/education/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "school_id": 5,
  "start_date": "2015-04-01",
  "end_date": "2019-03-31",
  "notes": "Updated notes"
}
```

#### Delete Education
```http
DELETE /api/history/education/1
Authorization: Bearer <token>
```

---

### 4. Employment History Endpoints

#### Add Employment
```http
POST /api/history/employment
Authorization: Bearer <token>
Content-Type: application/json

{
  "person_id": 1,
  "company_id": 1,
  "start_date": "2020-01-15",
  "end_date": null,
  "position": "Software Developer"
}
```

Set `end_date` to `null` for current employment.

#### Get Employment by Person
```http
GET /api/history/employment/person/1
Authorization: Bearer <token>
```

Returns all employment records with:
- Company name and type
- Position
- Start and end dates
- Employment status (Current/Former)
- Years worked (calculated)

#### Update Employment
```http
PUT /api/history/employment/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "company_id": 1,
  "start_date": "2020-01-15",
  "end_date": "2023-12-31",
  "position": "Senior Developer"
}
```

#### Delete Employment
```http
DELETE /api/history/employment/1
Authorization: Bearer <token>
```

---

### 5. Contact Endpoints

#### Add Contact
```http
POST /api/history/contact
Authorization: Bearer <token>
Content-Type: application/json

{
  "person_id": 1,
  "contact_number": "9841234567",
  "type": "Mobile"
}
```

**Types**: Mobile, Home, Office, etc.

#### Get Contacts by Person
```http
GET /api/history/contact/person/1
Authorization: Bearer <token>
```

#### Update Contact
```http
PUT /api/history/contact/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "contact_number": "9851234567",
  "type": "Mobile"
}
```

#### Delete Contact
```http
DELETE /api/history/contact/1
Authorization: Bearer <token>
```

---

### 6. Organization Endpoints

#### Create Jurisdiction
```http
POST /api/organizations/jurisdictions
Authorization: Bearer <token>
Content-Type: application/json

{
  "jurisdiction_name": "Kathmandu Metropolitan City",
  "mayor": "Balen Shah",
  "vice_mayor": "Sunita Dangol",
  "no_of_districts": 32
}
```

#### Get All Jurisdictions
```http
GET /api/organizations/jurisdictions
Authorization: Bearer <token>
```

#### Create School
```http
POST /api/organizations/schools
Authorization: Bearer <token>
Content-Type: application/json

{
  "school_name": "Tribhuvan University",
  "school_address": "Kirtipur, Kathmandu",
  "jurisdiction_id": 1
}
```

#### Get All Schools
```http
GET /api/organizations/schools
Authorization: Bearer <token>
```

#### Create Company
```http
POST /api/organizations/companies
Authorization: Bearer <token>
Content-Type: application/json

{
  "company_name": "Tech Solutions Nepal",
  "company_type": "IT Services",
  "company_estd_date": "2015-05-15",
  "company_value": "NPR 50,000,000",
  "company_main_branch_jurisdiction_id": 1,
  "current_branch_jurisdiction_id": 1
}
```

#### Get All Companies
```http
GET /api/organizations/companies
Authorization: Bearer <token>
```

#### Create Hospital
```http
POST /api/organizations/hospitals
Authorization: Bearer <token>
Content-Type: application/json

{
  "hospital_name": "Bir Hospital",
  "hospital_address": "Tundikhel, Kathmandu",
  "hospital_estd": "1889-01-01 00:00:00",
  "hospital_director": "Dr. Arun Kumar",
  "jurisdiction_id": 1
}
```

#### Get All Hospitals
```http
GET /api/organizations/hospitals
Authorization: Bearer <token>
```

#### Get Statistics
```http
GET /api/organizations/statistics
Authorization: Bearer <token>
```

Returns:
- Total persons
- Total schools
- Total companies
- Total hospitals
- Total jurisdictions
- Total education records
- Total employment records

---

## 🔒 Role-Based Access Control

| Action | Admin | HR | Verifier | User |
|--------|-------|-----|----------|------|
| Create Person | ✅ | ✅ | ❌ | ❌ |
| View Persons | ✅ | ✅ | ✅ | ✅ |
| Update Person | ✅ | ✅ | ❌ | ❌ |
| Delete Person | ✅ | ❌ | ❌ | ❌ |
| Manage Education/Employment | ✅ | ✅ | ❌ | ❌ |
| Create Organizations | ✅ | ✅ | ❌ | ❌ |
| Create Jurisdictions | ✅ | ❌ | ❌ | ❌ |

---

## 📁 Project Structure

```
person-tracking-backend/
├── config/
│   └── database.js          # MySQL connection
├── controllers/
│   ├── authController.js    # Authentication
│   ├── personController.js  # Person CRUD
│   ├── historyController.js # Education/Employment/Contacts
│   └── organizationController.js # Schools/Companies/Hospitals
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── upload.js            # File upload
├── routes/
│   ├── authRoutes.js
│   ├── personRoutes.js
│   ├── historyRoutes.js
│   └── organizationRoutes.js
├── database/
│   └── schema.sql           # Complete database schema
├── uploads/                 # File storage
├── .env.example
├── .gitignore
├── server.js                # Main application
├── package.json
└── README.md
```

---

## 🔄 Complete Workflow Example

### Scenario: Track "Sita Kumari Thapa"

**Step 1: Login**
```http
POST /api/auth/login
{
  "email": "admin@system.com",
  "password": "admin123"
}
→ Receive token
```

**Step 2: Create Person**
```http
POST /api/persons
{
  "name": "Sita Kumari Thapa",
  "dob": "1998-03-20",
  "contact": 9851234567,
  "jurisdiction_id": 2
}
→ Person ID: 5
```

**Step 3: Add Contact Numbers**
```http
POST /api/history/contact
{
  "person_id": 5,
  "contact_number": "9851234567",
  "type": "Mobile"
}

POST /api/history/contact
{
  "person_id": 5,
  "contact_number": "01-5234567",
  "type": "Home"
}
```

**Step 4: Add Education History**
```http
POST /api/history/education
{
  "person_id": 5,
  "school_id": 2,
  "start_date": "2010-04-01",
  "end_date": "2018-03-31",
  "notes": "Completed SLC and +2"
}

POST /api/history/education
{
  "person_id": 5,
  "school_id": 5,
  "start_date": "2018-04-01",
  "end_date": "2022-03-31",
  "notes": "Bachelor in IT"
}
```

**Step 5: Add Employment History**
```http
POST /api/history/employment
{
  "person_id": 5,
  "company_id": 3,
  "start_date": "2021-06-01",
  "end_date": null,
  "position": "Junior Developer"
}
```

**Step 6: View Complete Profile**
```http
GET /api/persons/5
→ Returns everything:
  - Basic info
  - 2 contact numbers
  - 2 education records
  - 1 employment record (current)
```

---

## 📊 Database Features

### Pre-built Views:
1. **vw_person_complete** - Person with all relationships
2. **vw_person_education** - Complete education history with calculations
3. **vw_person_employment** - Complete employment history with status
4. **vw_person_contacts** - All contacts grouped by person

### Stored Procedures:
- **sp_get_person_profile(person_id)** - Returns complete profile

### Functions:
- **fn_calculate_age(birth_date)** - Calculates current age

### Triggers:
- **tr_person_created** - Logs person creation
- **tr_person_updated** - Logs person updates

---

## 🚀 Sample Data Included

After running schema.sql, you'll have:
- 4 Jurisdictions (Kathmandu, Lalitpur, Bhaktapur, Pokhara)
- 4 Hospitals
- 5 Schools (including Tribhuvan University)
- 4 Companies
- 4 Persons with complete profiles
- 3 Login users (admin, hr, verifier)
- Multiple education and employment records
- Multiple contact numbers

---

## 🔧 Advanced Queries

### Find All Persons in Kathmandu
```sql
SELECT p.*, j.jurisdiction_name
FROM Person p
JOIN Jurisdiction j ON p.jurisdiction_id = j.jurisdiction_id
WHERE j.jurisdiction_name = 'Kathmandu Metropolitan City';
```

### Find All TU Alumni
```sql
SELECT DISTINCT p.name, ps.start_date, ps.end_date
FROM Person p
JOIN Person_School ps ON p.id = ps.person_id
JOIN School s ON ps.school_id = s.school_id
WHERE s.school_name = 'Tribhuvan University';
```

### Find Current Employees by Company
```sql
SELECT p.name, c.company_name, pc.position
FROM Person p
JOIN Person_Company pc ON p.id = pc.person_id
JOIN Company c ON pc.company_id = c.company_id
WHERE pc.end_date IS NULL
  AND c.company_name = 'Tech Solutions Nepal Pvt. Ltd.';
```

---

## 🧪 Testing

### Using cURL:

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@system.com","password":"admin123"}'
```

**Get All Persons:**
```bash
curl -X GET http://localhost:5000/api/persons \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman:
1. Import endpoints
2. Set environment variable for token
3. Test each endpoint

---

## 📈 Performance Optimization

The system includes:
- Database indexes on frequently queried columns
- Connection pooling for MySQL
- Efficient JOIN queries
- Pre-built views for complex queries
- Pagination for large datasets

---

## 🔐 Security Features

✅ JWT authentication with expiration  
✅ Password hashing with bcrypt  
✅ Role-based authorization  
✅ SQL injection protection  
✅ CORS enabled  
✅ Input validation  
✅ Activity logging  

---

## 🚀 Deployment

### Production Checklist:
1. Change all default passwords
2. Set strong JWT_SECRET
3. Use environment variables
4. Enable HTTPS
5. Set up database backups
6. Configure proper CORS
7. Add rate limiting
8. Set up monitoring

---

## 📝 License

This project is for educational/development purposes.

---

## 🎓 Perfect for College Projects

Demonstrates:
- ✅ Complete REST API design
- ✅ Database relationships (one-to-many, many-to-many)
- ✅ Authentication & Authorization
- ✅ CRUD operations
- ✅ Complex queries with JOINs
- ✅ Database views and stored procedures
- ✅ Industry best practices

---

**Built with ❤️ for Nepal**
