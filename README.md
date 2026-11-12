# Task Management System - Backend API

A RESTful backend API for a Task Management System built with Node.js, Express, and MongoDB.  
Users can register, login, and manage their own tasks with JWT-based authentication.

---

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt
- Role-based access control (user / admin)
- Full CRUD operations for tasks
- Ownership protection — users can only access their own tasks
- Input validation and proper HTTP status codes
- Protected routes using middleware
- CORS enabled for frontend integration

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| CORS | Cross-origin resource sharing |

---

## Project Structure

\`\`\`
my-node-project/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── taskRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
\`\`\`

---

## Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js (v18 or higher)
- npm
- MongoDB (local) or MongoDB Atlas account

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/your-username/task-management-backend.git
cd task-management-backend
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file in the root folder (see `.env.example` for reference):

\`\`\`env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1h
\`\`\`

4. Start the server:

\`\`\`bash
# development mode (with nodemon)
npm run dev

# production mode
npm start
\`\`\`

Server will run on \`http://localhost:5000\`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | \`/api/auth/register\` | Register a new user | Public |
| POST | \`/api/auth/login\` | Login and get JWT token | Public |
| GET | \`/api/profile\` | Get current user profile | Private |
| GET | \`/api/admin/dashboard\` | Admin dashboard | Admin only |

### Tasks

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | \`/api/tasks\` | Create a new task | Private |
| GET | \`/api/tasks\` | Get all tasks of logged-in user | Private |
| GET | \`/api/tasks/:id\` | Get single task by ID | Private |
| PUT | \`/api/tasks/:id\` | Update a task | Private |
| DELETE | \`/api/tasks/:id\` | Delete a task | Private |

---

## Request Examples

### Register User

\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "123456"
}
\`\`\`

**Response (201 Created):**

\`\`\`json
{
  "message": "User registered successfully",
  "user": {
    "id": "674a1b2c3d4e5f6a7b8c9d0e",
    "name": "Ali Khan",
    "email": "ali@example.com",
    "role": "user"
  }
}
\`\`\`

### Login

\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ali@example.com",
  "password": "123456"
}
\`\`\`

**Response (200 OK):**

\`\`\`json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "674a1b2c3d4e5f6a7b8c9d0e",
    "name": "Ali Khan",
    "email": "ali@example.com",
    "role": "user"
  }
}
\`\`\`

### Create Task

\`\`\`http
POST /api/tasks
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Complete Task 2 backend",
  "description": "Build CRUD APIs for task management",
  "priority": "high",
  "status": "pending"
}
\`\`\`

**Response (201 Created):**

\`\`\`json
{
  "message": "Task created successfully",
  "task": {
    "_id": "674b1c2d3e4f5a6b7c8d9e0f",
    "title": "Complete Task 2 backend",
    "description": "Build CRUD APIs for task management",
    "priority": "high",
    "status": "pending",
    "user": "674a1b2c3d4e5f6a7b8c9d0e",
    "createdAt": "2026-11-12T10:30:00.000Z",
    "updatedAt": "2026-11-12T10:30:00.000Z"
  }
}
\`\`\`

### Get All Tasks

\`\`\`http
GET /api/tasks
Authorization: Bearer <your_token>
\`\`\`

**Response (200 OK):**

\`\`\`json
{
  "count": 2,
  "tasks": [
    {
      "_id": "674b1c2d3e4f5a6b7c8d9e0f",
      "title": "Complete Task 2 backend",
      "status": "pending",
      "priority": "high"
    }
  ]
}
\`\`\`

### Update Task

\`\`\`http
PUT /api/tasks/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "status": "completed",
  "priority": "low"
}
\`\`\`

**Response (200 OK):**

\`\`\`json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "674b1c2d3e4f5a6b7c8d9e0f",
    "title": "Complete Task 2 backend",
    "status": "completed",
    "priority": "low"
  }
}
\`\`\`

### Delete Task

\`\`\`http
DELETE /api/tasks/:id
Authorization: Bearer <your_token>
\`\`\`

**Response (200 OK):**

\`\`\`json
{
  "message": "Task deleted successfully"
}
\`\`\`

---

## Security Highlights

- **Password hashing**: All passwords are hashed with bcrypt before storing in the database. Plain passwords are never saved.
- **JWT authentication**: Every protected route verifies the token and attaches user info to the request.
- **Ownership check**: Every task query includes \`{ user: req.user.userId }\` so users can never access another user's data.
- **Input validation**: Empty titles, invalid IDs, and missing fields are rejected with proper error messages.
- **Environment variables**: Secrets like JWT keys and DB URIs are stored in \`.env\` and never committed to git.

---

## Error Responses

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad request (missing fields, invalid data) |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Resource not found |
| 500 | Internal server error |

---

## Testing

All endpoints were tested using Postman. A Postman collection is included in the repo (\`postman_collection.json\`).

**To test manually:**

1. Register a user via \`POST /api/auth/register\`
2. Login via \`POST /api/auth/login\` and copy the token
3. Add the token in the \`Authorization\` header as \`Bearer <token>\`
4. Test the task endpoints

**Security test:**  
Create two users. Login as user A, create a task. Then login as user B and try to access user A's task ID — it should return **404 Not Found**.

---

## Deployment

The backend is deployed on [Render](https://render.com) (or fill your platform).  
Live URL: \`https://your-backend-url.onrender.com\`

Frontend is deployed on Netlify: \`https://project-2-task.netlify.app\`

---

## Environment Variables

See \`.env.example\`:

\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
\`\`\`

> Never commit the actual \`.env\` file to GitHub. It's already added to \`.gitignore\`.

---

## Author

**Your Name**  
GitHub: [@your-username](https://github.com/your-username)  
LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

## License

This project is part of an internship task and is intended for learning purposes.
\`\`\`

---

## `.env.example` File Bhi Banao

Project root mein `.env.example` banayein (yeh commit hogi, `.env` nahi):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1h
