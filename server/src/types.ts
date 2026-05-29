import type { Generated } from "kysely";

// Types

export type Role = "student" | "organization";
export type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

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
  is_valid: Generated<boolean>;
  created_at: Generated<Date>;
};

export interface OrganizationsTable {
  user_id: string;
};

export interface StudentsTable {
  user_id: string;
  organization_id: string | null;
};

export interface TasksTable {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  due_date: Date;
  created_at: Date;  
};

export interface Database {
  Users: UsersTable;
  Organizations: OrganizationsTable;
  Students: StudentsTable;
  Tasks: TasksTable;
};
