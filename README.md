# Task Manager API

---

**Project Name:** Task-Manager-Api  
**Start Date:** March 2026  
**Last Updated:** March 2026  
**Author:** Elio Ishak (CS student at AUB)

---

A simple backend REST API built with **Node.js, Express, TypeScript, PostgreSQL (Dockerized), and Kysely**.

This project demonstrates JWT authentication, password hashing, protected routes, relational database design, and type-safe SQL querying without using a heavy ORM.

---

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL (running in Docker)
- Kysely (type-safe SQL query builder)
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
- Manual SQL migrations

---

## Database Schema

### Users

```sql
CREATE TABLE users (
  id VARCHAR(11) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  is_valid BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks

```sql
CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

CREATE TABLE tasks (
  id VARCHAR(11) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'TODO',
  user_id VARCHAR(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Running with Docker (PostgreSQL)

Start PostgreSQL and Adminer:

```bash
docker compose up -d
```

Apply migration:

```bash
type src\db\migrations\001_init.sql | docker exec -i taskmanager-postgres psql -U admin -d taskmanager
```

---

## Environment Variables

Create a `.env` file:

```
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql://admin:your_password@localhost:5432/taskmanager
PORT=3000
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