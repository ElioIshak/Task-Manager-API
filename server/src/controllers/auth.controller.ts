import { Request, Response } from 'express';
import { signup, login } from '../services/auth.service';

// signup controller
export async function signupController(req: Request, res: Response) {
    try {
        const {
            email,
            firstName,
            lastName,
            password,
            confirmationPass,
            role,
            organizationId
        } = req.body;

        const result = await signup(email, firstName, lastName, password, confirmationPass, role, organizationId);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json(
            {message: error instanceof Error ? error.message: "Signup failed!"}
        );
    }
};

// login controller
export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const result = await login(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Login Failed!"
        });
    }
};
