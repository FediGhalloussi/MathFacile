import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'changeme';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.auth_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Accès non autorisé: token manquant' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number; name: string; email: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré' });
        return;
    }
};
