# Task Manager API

---

**Project Name:** Task-Manager-Api  
**Start Date:** March 2026  
**Last Updated:** March 2026
**Author:** Elio Ishak (CS student at AUB)  

---

A simple backend REST API built with **Node.js, Express, TypeScript, and MySQL**.

This project demonstrates JWT authentication, password hashing, protected routes, and relational database design.

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MySQL
- bcrypt (password hashing)
- jose (JWT)

---

## Features

- User signup & login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes with middleware
- CRUD operations for tasks
- Task ownership enforcement

---

## Database Schema

### Users

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  owner_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
```

---

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks (Protected)
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`