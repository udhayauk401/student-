# Student Management System - Backend Documentation

A complete Node.js and Express backend for a Student Management System with MongoDB Atlas integration.

## Features

✅ Complete REST API for student management
✅ MongoDB Atlas cloud database integration
✅ Input validation for all fields
✅ Search and filter functionality
✅ CORS enabled
✅ Error handling
✅ Bootstrap-based frontend with all CRUD operations
✅ Fetch API integration

## Project Structure

```
student-management-system-backend/
├── server.js                      # Main server file
├── package.json                   # Dependencies
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── config/
│   └── db.js                     # MongoDB connection
├── models/
│   └── Student.js                # Student schema
├── controllers/
│   └── studentController.js       # Route handlers
├── routes/
│   └── studentRoutes.js           # API routes
├── index.html                    # Frontend HTML
└── API_TESTING.md                # API testing examples
```

## Prerequisites

Before you start, ensure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Git** (optional)
- **Code Editor** (VS Code recommended)

## Installation & Setup

### Step 1: Clone/Download the Project

```bash
# If using git
git clone <your-repo-url>
cd student-management-system-backend

# Or just download and extract the zip file
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **nodemon** - Auto-reload during development

### Step 3: Create MongoDB Atlas Database

1. **Sign Up/Login** to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a Free Cluster**:
   - Click "Create a Project"
   - Name it (e.g., "Student-Management")
   - Click "Create Project"
   - Click "Build a Cluster"
   - Select the Free tier
   - Choose your preferred region
   - Click "Create Cluster" (takes 2-3 minutes)

3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/studentDB`

4. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `yourUsername` (remember this)
   - Password: `yourPassword` (strong password)
   - Click "Create Database User"

5. **Whitelist Your IP**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add Current IP or Allow from Anywhere (for development)
   - Click "Confirm"

### Step 4: Configure Environment Variables

Edit the `.env` file:

```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/studentDB
PORT=5000
NODE_ENV=development
```

**Replace:**
- `yourUsername` - Your MongoDB Atlas username
- `yourPassword` - Your MongoDB Atlas password
- `cluster` - Your cluster name from connection string

### Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

## API Endpoints

### 1. Get All Students
```
GET /api/students
```

**Query Parameters:**
- `search` - Search by name, email, or phone
- `department` - Filter by department

**Example:**
```
GET /api/students?search=John&department=Computer Science
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "9876543210",
      "department": "Computer Science",
      "createdAt": "2024-05-15T10:30:00.000Z",
      "updatedAt": "2024-05-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Student
```
GET /api/students/:id
```

**Example:**
```
GET /api/students/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 3. Create Student
```
POST /api/students
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phoneNumber": "9876543211",
  "department": "Electrical Engineering"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 4. Update Student
```
PUT /api/students/:id
Content-Type: application/json
```

**Example:**
```
PUT /api/students/507f1f77bcf86cd799439011
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phoneNumber": "9876543220",
  "department": "Mechanical Engineering"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 5. Delete Student
```
DELETE /api/students/:id
```

**Example:**
```
DELETE /api/students/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

## Validation Rules

| Field | Rules |
|-------|-------|
| **name** | 2-50 characters, required |
| **email** | Valid email format, unique, required |
| **phoneNumber** | Exactly 10 digits, required |
| **department** | Required, string |

---

## Frontend Integration

### Using the Provided HTML File

1. **Open `index.html`** in your browser or use Live Server
2. **Make sure backend is running** on `http://localhost:5000`
3. **All CRUD operations** work through the UI

### Fetch API Examples

#### Get all students
```javascript
fetch('http://localhost:5000/api/students')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Add a student
```javascript
const studentData = {
  name: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '9876543210',
  department: 'Computer Science'
};

fetch('http://localhost:5000/api/students', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(studentData)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Update a student
```javascript
const studentId = '507f1f77bcf86cd799439011';
const updatedData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phoneNumber: '9876543211',
  department: 'Data Science'
};

fetch(`http://localhost:5000/api/students/${studentId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedData)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Delete a student
```javascript
const studentId = '507f1f77bcf86cd799439011';

fetch(`http://localhost:5000/api/students/${studentId}`, {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Search and filter
```javascript
const search = 'John';
const department = 'Computer Science';

const params = new URLSearchParams({
  search: search,
  department: department
});

fetch(`http://localhost:5000/api/students?${params}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

---

## Testing the API

### Option 1: Using the Frontend
Simply open `index.html` in your browser and use the UI to:
- Add new students
- View all students
- Search and filter students
- Edit students
- Delete students

### Option 2: Using cURL

#### Get all students
```bash
curl http://localhost:5000/api/students
```

#### Add student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "department": "Computer Science"
  }'
```

#### Update student
```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phoneNumber": "9876543211",
    "department": "Data Science"
  }'
```

#### Delete student
```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

### Option 3: Using Postman

1. **Download** [Postman](https://www.postman.com/downloads/)
2. **Create Requests** with the examples in `API_TESTING.md`
3. **Test all endpoints** with different data

---

## Troubleshooting

### Issue: "MongoDB connection failed"
- Check your `.env` file for correct credentials
- Verify IP whitelist in MongoDB Atlas
- Ensure database user exists with correct password
- Test connection string in MongoDB Atlas compass

### Issue: "Email already exists" error
- Each email must be unique
- Try different email addresses

### Issue: "Phone number must be exactly 10 digits"
- Enter only 10 numeric digits
- Remove any formatting like dashes or spaces

### Issue: CORS errors in browser
- Ensure backend is running on `http://localhost:5000`
- Check that CORS middleware is enabled in `server.js`

### Issue: Cannot connect from frontend
- Open browser console (F12)
- Check Network tab for failed requests
- Verify backend URL in HTML/JavaScript matches your setup

---

## File Descriptions

### server.js
Main application file that:
- Initializes Express app
- Connects to MongoDB
- Sets up middleware (CORS, JSON parser)
- Defines routes
- Handles errors

### config/db.js
MongoDB connection configuration:
- Reads MONGODB_URI from .env
- Connects using Mongoose
- Handles connection errors

### models/Student.js
Mongoose schema defining:
- Student document structure
- Field validations
- Data types
- Default values

### controllers/studentController.js
Contains all business logic:
- getStudents() - Retrieve all/filtered students
- getStudent() - Get single student
- createStudent() - Create new student
- updateStudent() - Update student
- deleteStudent() - Delete student

### routes/studentRoutes.js
Defines all API routes:
- GET /api/students
- GET /api/students/:id
- POST /api/students
- PUT /api/students/:id
- DELETE /api/students/:id

### index.html
Complete frontend with:
- Bootstrap 5 UI
- Search and filter
- Add/Edit/Delete/View students
- Form validation
- Real-time feedback
- Responsive design

---

## Environment Variables

```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/studentDB
PORT=5000
NODE_ENV=development
```

**Explanation:**
- `MONGODB_URI` - MongoDB Atlas connection string
- `PORT` - Server port (default 5000)
- `NODE_ENV` - Environment type (development/production)

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | MongoDB ODM |
| **CORS** | Cross-origin requests |
| **dotenv** | Environment variables |
| **Bootstrap 5** | Frontend styling |
| **Fetch API** | Frontend HTTP requests |

---

## Project Statistics

- **Total Files**: 8
- **API Endpoints**: 5
- **Student Fields**: 4
- **Validation Rules**: 4
- **Frontend Features**: 5 (Add, Edit, Delete, View, Search)

---

## Security Notes

For production deployment:
1. Use strong passwords for MongoDB
2. Implement JWT authentication
3. Add request validation middleware
4. Use HTTPS instead of HTTP
5. Implement rate limiting
6. Add input sanitization
7. Use environment-specific configurations

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Set up MongoDB Atlas
3. ✅ Configure .env file
4. ✅ Start the server
5. ✅ Open index.html in browser
6. ✅ Test CRUD operations
7. ✅ Integrate with your own frontend

---

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)

---

## Support

For issues or questions:
1. Check `API_TESTING.md` for API examples
2. Review error messages in browser console
3. Check MongoDB Atlas connection
4. Verify .env configuration
5. Check server logs in terminal

---

## License

This project is open source and available for educational purposes.

---

## Version

- **Version**: 1.0.0
- **Last Updated**: May 2024
- **Author**: Student Management System Team
