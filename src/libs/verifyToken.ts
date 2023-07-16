import { Request, Response, NextFunction } from "express";
     
import Jwt from "jsonwebtoken";

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json('Acceso denegado')

    const payload = Jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;

    req.userId = payload._id;

    console.log(payload)

    next();
}