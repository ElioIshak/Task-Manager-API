// Types

export type Role = "student" | "organization" | "admin";
export type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type User = {
    id: string;
    name: string;
    email: string;
    hashed_password: string;
    role: Role;
    is_valid: boolean;
}

export type Task = {
  id: string;
  title: string;
  status: boolean;
  description: Text;
  ownerId: string;
  createdAt: number;
}

export type UserJWT = {
  sub: string;
  email: string;
  role: Role;
}

// Interfaces

export interface UsersTable {
  id: string;
  name: string;
  email: string;
  hashed_password: string;
  role: Role;
  is_valid: boolean;
  created_at: Date;
};

export interface TasksTable {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  user_id: string;
  created_at: Date;  
};

export interface Database {
  Users: UsersTable;
  Tasks: TasksTable;
};