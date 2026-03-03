
CREATE TYPE Role AS ENUM ('admin', 'organization', 'student');
CREATE TYPE Task_Status AS ENUM ('TODO', 'COMPLETED', 'IN_PROGRESS');

CREATE TABLE Users (
    id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    hashedPassword VARCHAR(120) NOT NULL,
    role VARCHAR(20) NOT NULL,
    isValid BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tasks (
    id VARCHAR(16) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status task_status DEFAULT 'TODO',
    user_id VARCHAR(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Speeds up queries that filter or join tasks by corresponding attributes
CREATE INDEX idx_users_id ON Users(id);
CREATE INDEX idx_users_name ON Users(name);
CREATE INDEX idx_users_email ON Users(email);

CREATE INDEX idx_tasks_userID ON Tasks(user_id);
CREATE INDEX idx_tasks_createdAt ON Tasks(created_at);
CREATE INDEX idx_tasks_status ON Tasks(status);