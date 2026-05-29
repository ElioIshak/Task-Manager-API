import type { RequestHandler } from "express";
import * as jose from "jose";
import config from "../config";
import type { UserJWT } from "../types";

export const setUserJWT = (async (req, _res, next) => {
    const header = req.headers.authorization;

    if (!header)
        return next();

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token)
        return next();

    try {
        const { payload } = await jose.jwtVerify<UserJWT>(
            token,
            new TextEncoder().encode(config.JWT_SECRET),
            { algorithms: ["HS256"] }
        );

        req.userJWT = payload;
    }
    catch {}

    next();
}) as RequestHandler;

export const requireAuth = ((req, res, next) => {
    if (!req.userJWT)
        return res.status(401).json({ message: "Not authenticated!" });

    next();
}) as RequestHandler;
