export type Role = "student" | "organization" | "admin";

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
  completed: boolean;
  ownerId: string;
  createdAt: number;
}

export type UserJWT = {
  sub: string;
  email: string;
  role: Role;
}