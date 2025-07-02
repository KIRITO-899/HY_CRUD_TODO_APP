# TODO CRUD API

A simple TODO management application with user authentication built with Node.js, Express, and MongoDB.

## Features

- User registration and login
- JWT authentication
- Create, read, update, delete todos
- Filter todos by completion status and priority
- Beautiful landing page with favicon

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Create .env file**
```env
MONGODB_URI=mongodb://localhost:27017/todo_crud
JWT_SECRET=your_secret_key_here
PORT=3000
```

3. **Start the server**
```bash
npm run dev
```

4. **Visit the app**
Open `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### TODOs (Protected routes - requires JWT token)
- `POST /api/todos` - Create todo
- `GET /api/todos` - Get all todos
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Usage Example

1. **Register a user**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

2. **Login to get token**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

3. **Create a todo (use token from login)**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Buy groceries","description":"Milk and bread","priority":"medium"}'
```

## MongoDB Setup

### Option 1: Local MongoDB
Install MongoDB locally and start the service

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster
3. Add your IP to whitelist
4. Get connection string and update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo_crud
```

## Project Structure

```
├── config/database.js      # MongoDB connection
├── middleware/auth.js      # JWT middleware
├── models/
│   ├── User.js            # User model
│   └── Todo.js            # Todo model
├── routes/
│   ├── auth.js            # Auth routes
│   └── todos.js           # Todo routes
├── public/                # Static files & favicon
├── server.js              # Main app file
└── .env                   # Environment variables
```

## License

ISC
