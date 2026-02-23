# Quick Start Guide - Person Tracking System

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd person-tracking-backend
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=person_tracking_system
JWT_SECRET=change_this_secret_key
```

### Step 3: Create Database
```bash
mysql -u root -p < database/schema.sql
```

### Step 4: Start Server
```bash
npm start
```

You should see:
```
✅ Database connected successfully
🚀 Person Tracking System API Server
✅ Server is running on port 5000
```

---

## 🧪 Test the API

### 1. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@system.com",
    "password": "admin123"
  }'
```

Copy the token from response!

### 2. Get All Persons
```bash
curl -X GET http://localhost:5000/api/persons \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Get Statistics
```bash
curl -X GET http://localhost:5000/api/organizations/statistics \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📋 Common Tasks

### Create a New Person
```bash
curl -X POST http://localhost:5000/api/persons \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Person",
    "dob": "1995-01-01",
    "contact": 9841234567,
    "jurisdiction_id": 1
  }'
```

### Add Education History
```bash
curl -X POST http://localhost:5000/api/history/education \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "person_id": 1,
    "school_id": 5,
    "start_date": "2015-04-01",
    "end_date": "2019-03-31",
    "notes": "Bachelor Degree"
  }'
```

### Add Employment History
```bash
curl -X POST http://localhost:5000/api/history/employment \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "person_id": 1,
    "company_id": 1,
    "start_date": "2020-01-01",
    "end_date": null,
    "position": "Developer"
  }'
```

---

## 🔑 Default Credentials

**Admin:**
- Email: `admin@system.com`
- Password: `admin123`

**HR:**
- Email: `hr@system.com`
- Password: `admin123`

**Verifier:**
- Email: `verifier@system.com`
- Password: `admin123`

⚠️ Change these in production!

---

## 📊 What's Included

✅ 4 Sample persons with complete profiles  
✅ 4 Jurisdictions (Kathmandu, Lalitpur, Bhaktapur, Pokhara)  
✅ 5 Schools including Tribhuvan University  
✅ 4 Companies  
✅ 4 Hospitals  
✅ Education history  
✅ Employment history  
✅ Contact numbers  

---

## 🎯 Next Steps

1. Read the full **README.md** for complete API documentation
2. Import endpoints into Postman/Thunder Client
3. Explore the sample data
4. Build your own features
5. Test all CRUD operations

---

## ⚠️ Troubleshooting

**Database connection failed?**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

**Port already in use?**
- Change `PORT` in `.env`
- Or stop the process using port 5000

**Module not found?**
- Run `npm install` again
- Check Node.js version (v14+)

---

## 📖 Documentation

- **README.md** - Full API documentation
- **database/schema.sql** - Database structure
- Postman collection (create your own)

---

Happy coding! 🚀
