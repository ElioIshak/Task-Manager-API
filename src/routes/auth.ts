import { Router } from "express";
import * as jose from "jose";
import config from "../config";
import { UserJWT, Role } from "../types";
import { requireAuth } from "../middleware/auth";
import { hashPassword, verifyPassword } from "../utils/password";

// create auth router
const router = Router();

// signup endpoint
// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    // get email and password from request bbdy ({} if not found)
    const {email, password} = req.body ?? {};

    // validate email and password
    if(!email || !password)
        return res.status(400).json({error: "missing email or password..."});

    if(typeof email !== "string" || typeof password !== "string")
        return res.status(400).json({error: "email and password must be strings..."});

    // normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // hash password
    const hashedPass = hashPassword(password);

    // DO VALIDATION RELATED TO SQL DB LATER ON

    return res.status(201).json({
        message: "signedup successfully...",
        email : normalizedEmail,
        hashedPassword: hashedPass
    });
});

// login endpoint
// POST /api/auth/login
router.post('/login', async (req, res) => {
    const {email, password} = req.body ?? {};

    if(!email || !password)
        return res.status(400).json({error: "missing email or password..."});

    if(typeof email !== "string" || typeof password !== "string")
        return res.status(400).json({error: "email and password must be strings..."});

    const normalizedEmail = email.toLowerCase().trim();

    //----------------------------------------------------------------------
    // USE SQL TO FIND USER AND VALIDATE IT AND REMOVE THIS TEMP ADMIN USER
    const role : Role = "student";

    const tempUser = {
        id: "2026100",
        name: "User",
        email: "test@gmail.com",
        hashed_password: "hashed_pass",
        role: role,
        isValid: true
    }
    //-----------------------------------------------------------------------

    if(!tempUser)
        return res.status(401).json({error: "Invalid credentials..."})

    if(!tempUser.isValid)
        return res.status(403).json({error: "User is Banned..."});

    const verified = verifyPassword(password, tempUser.hashed_password);

    if(!verified)
        return res.status(401).json({error: "Invalid Password..."});

    // build JWT payload (identity card)
    const payload: UserJWT = {
        sub: tempUser.id,
        email: tempUser.email,
        role: tempUser.role
    };      

    //sign JWT with secret key
    const JWT_SECRET = config.JWT_SECRET;

    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("10h")
        .sign(new TextEncoder().encode(JWT_SECRET));

    return res.json({Token: token, Id: tempUser.id, Email: email});
});

// return who is currently logged it
// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
    res.json({
        id: req.userJWT!.sub,
        email: req.userJWT!.email,
        role: req.userJWT?.role
    });
});

export default router;