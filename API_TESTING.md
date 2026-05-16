# Student Management System - API Testing Examples

## Base URL
```
http://localhost:5000/api
```

## 1. Health Check
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 2. Get All Students

### Using cURL
```bash
curl http://localhost:5000/api/students
```

### Using fetch() in JavaScript
```javascript
fetch('http://localhost:5000/api/students')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Postman
- Method: GET
- URL: http://localhost:5000/api/students
- Headers: None required

**Response:**
```json
{
  "success": true,
  "count": 2,
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

## 3. Search and Filter Students

### Search by name
```bash
curl "http://localhost:5000/api/students?search=John"
```

### Filter by department
```bash
curl "http://localhost:5000/api/students?department=Computer Science"
```

### Search AND Filter
```bash
curl "http://localhost:5000/api/students?search=John&department=Computer Science"
```

### Using fetch()
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

## 4. Get Single Student

### Using cURL
```bash
curl http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

### Using fetch()
```javascript
const studentId = '507f1f77bcf86cd799439011';

fetch(`http://localhost:5000/api/students/${studentId}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "department": "Computer Science",
    "createdAt": "2024-05-15T10:30:00.000Z",
    "updatedAt": "2024-05-15T10:30:00.000Z"
  }
}
```

---

## 5. Create Student (POST)

### Using cURL
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phoneNumber": "9876543211",
    "department": "Electrical Engineering"
  }'
```

### Using fetch()
```javascript
const studentData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  phoneNumber: "9876543211",
  department: "Electrical Engineering"
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

### Using Postman
- Method: POST
- URL: http://localhost:5000/api/students
- Headers: Content-Type: application/json
- Body (JSON):
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phoneNumber": "9876543211",
  "department": "Electrical Engineering"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phoneNumber": "9876543211",
    "department": "Electrical Engineering",
    "createdAt": "2024-05-15T10:35:00.000Z",
    "updatedAt": "2024-05-15T10:35:00.000Z"
  }
}
```

---

## 6. Update Student (PUT)

### Using cURL
```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phoneNumber": "9876543220",
    "department": "Mechanical Engineering"
  }'
```

### Using fetch()
```javascript
const studentId = '507f1f77bcf86cd799439011';
const updatedData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phoneNumber: "9876543220",
  department: "Mechanical Engineering"
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

**Success Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phoneNumber": "9876543220",
    "department": "Mechanical Engineering",
    "createdAt": "2024-05-15T10:30:00.000Z",
    "updatedAt": "2024-05-15T10:40:00.000Z"
  }
}
```

---

## 7. Delete Student (DELETE)

### Using cURL
```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

### Using fetch()
```javascript
const studentId = '507f1f77bcf86cd799439011';

fetch(`http://localhost:5000/api/students/${studentId}`, {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Success Response:**
```json
{
  "success": true,
  "data": {},
  "message": "Student deleted successfully"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Name must be at least 2 characters"
}
```

### Duplicate Email (400)
```json
{
  "success": false,
  "error": "Email already exists"
}
```

### Invalid Phone Number (400)
```json
{
  "success": false,
  "error": "Phone number must be exactly 10 digits"
}
```

### Student Not Found (404)
```json
{
  "success": false,
  "error": "Student not found"
}
```

---

## Testing in Browser Console

Paste these examples directly into your browser's developer console (F12):

### Get all students
```javascript
fetch('http://localhost:5000/api/students')
  .then(res => res.json())
  .then(data => console.table(data.data));
```

### Add a new student
```javascript
fetch('http://localhost:5000/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phoneNumber: '9876543212',
    department: 'Civil Engineering'
  })
}).then(res => res.json()).then(data => console.log(data));
```

---

## Validation Rules

1. **Name**
   - Minimum: 2 characters
   - Maximum: 50 characters

2. **Email**
   - Must be valid email format
   - Must be unique (no duplicates)

3. **Phone Number**
   - Must be exactly 10 digits
   - Numeric only

4. **Department**
   - Required field
   - String value

---

## Notes

- All timestamps are in UTC ISO format
- MongoDB ObjectId is returned in `_id` field
- Use `_id` value for GET, PUT, and DELETE operations
- CORS is enabled for all origins
- Server runs on port 5000 by default
