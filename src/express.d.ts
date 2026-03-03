import "express";
import { UserJWT } from "./types";

// Extending Express's Request Interface Globally to add proprety userJWT
declare global {
    namespace Express {
        interface Request {
            userJWT ?: UserJWT;
        }
    }
}

export {};