import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = "SAILESH";

export const authenticateToken = (req:Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization'];
    const token  = authHeader;
    if(!token){
        return res.sendStatus(401);
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
    } catch (err) {
        console.log(`Error at authencateToken ${err}`);       
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
}