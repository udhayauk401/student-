# Quick Start Guide - Student Management System Backend

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies (2 minutes)
```bash
npm install
```

### 2️⃣ Get MongoDB URI (2 minutes)

Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas):
1. Create free account
2. Create cluster
3. Create database user
4. Whitelist IP
5. Copy connection string

### 3️⃣ Configure .env (1 minute)

Edit `.env` file:
```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/studentDB
PORT=5000
```

### 4️⃣ Start Server (1 minute)
```bash
npm run dev
```

Expected output:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

### 5️⃣ Open Frontend
- Open `index.html` in your browser
- Start managing students!

---

## 🚀 Quick Testing

### Via Frontend
1. Open `index.html`
2. Click "Add Student"
3. Fill form and submit
4. View students in table
5. Edit/Delete as needed

### Via cURL
```bash
# Add student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","phoneNumber":"9876543210","department":"CS"}'

# Get all students
curl http://localhost:5000/api/students

# Get student by ID
curl http://localhost:5000/api/students/[student-id]

# Update student
curl -X PUT http://localhost:5000/api/students/[student-id] \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@test.com","phoneNumber":"9876543211","department":"IT"}'

# Delete student
curl -X DELETE http://localhost:5000/api/students/[student-id]
```

### Via JavaScript (Browser Console)
```javascript
// Get all students
fetch('http://localhost:5000/api/students')
  .then(r => r.json())
  .then(d => console.table(d.data));

// Add student
fetch('http://localhost:5000/api/students', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Bob',
    email: 'bob@test.com',
    phoneNumber: '9876543212',
    department: 'EE'
  })
})
.then(r => r.json())
.then(d => console.log(d));
```

---

## 📋 Field Validation

| Field | Rules | Example |
|-------|-------|---------|
| **name** | 2-50 chars | "John Doe" |
| **email** | valid, unique | "john@example.com" |
| **phone** | 10 digits | "9876543210" |
| **dept** | required | "Computer Science" |

---

## 🔧 Project Structure

```
├── server.js              ← Start here
├── package.json           ← Dependencies
├── .env                   ← Configuration
├── config/db.js           ← MongoDB setup
├── models/Student.js      ← Database schema
├── controllers/           ← Business logic
├── routes/                ← API endpoints
├── index.html             ← Frontend UI
├── API_TESTING.md         ← Detailed examples
└── README.md              ← Full documentation
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "MongoDB connection failed" | Check MONGODB_URI in .env, verify IP whitelist |
| "Email already exists" | Use unique email addresses |
| "Phone must be 10 digits" | Enter only 10 numeric digits |
| "CORS error" | Ensure backend runs on localhost:5000 |
| "Server won't start" | Check if port 5000 is available |

---

## 📚 Detailed Resources

- **Full API Docs**: See `API_TESTING.md`
- **Complete Setup**: See `README.md`
- **Code Comments**: Check each file

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB Atlas account created
- [ ] .env file configured
- [ ] Dependencies installed (`npm install`)
- [ ] Server running (`npm run dev`)
- [ ] Frontend opens in browser
- [ ] Can add/edit/delete students

---

## 🎯 What's Included

✅ Complete REST API (GET, POST, PUT, DELETE)
✅ MongoDB Atlas integration
✅ Input validation
✅ Search & filter
✅ CORS enabled
✅ Error handling
✅ Beautiful Bootstrap frontend
✅ Fetch API examples
✅ cURL examples
✅ Complete documentation

---

## 🚀 Ready to Go!

Your Student Management System is now ready to use. Start building! 🎉
