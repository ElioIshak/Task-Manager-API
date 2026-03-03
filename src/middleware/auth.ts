import type { RequestHandler } from "express";
import * as jose from "jose";
import config from "../config";
import type { Role, UserJWT} from "../types";

// middleware to check if request contains a token -> if it does verify it | else continue
export const setUserJWT = (async (req, _res, next) => {
    const header = req.headers.authorization;

    // check if header exists
    if(!header)
        return next();

    const [scheme, token] = header.split(" ");

    // validate header's format
    if(scheme !== "Bearer" || !token)
        return next();

    try{

        // verify token
        const {payload} = await jose.jwtVerify<UserJWT>(
            token,
            new TextEncoder().encode(config.JWT_SECRET),
            {algorithms: ["HS256"]

        });

        // add payload to req
        req.userJWT = payload;
    }
    catch{}

    next();

}) as RequestHandler;


// middleware to secure endpoints
export const requireAuth = ((req, res, next) => {
    if(!req.userJWT)
        return res.status(401).json({error: "Not Authenticated..."});

    next();

}) as RequestHandler;
