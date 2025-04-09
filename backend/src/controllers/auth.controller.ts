import {CookieOptions, Request, Response} from 'express';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../services/auth.service';

const cookieOptions = (rememberMe: boolean = false) : CookieOptions => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7j ou 1h
});

// Route d'inscription
export const register = async (req: Request, res: Response) => {
    try {
        const { user, token } = await registerUser(req.body);
        res.cookie('auth_token', token, cookieOptions());
        res.json({ success: true, user });
    } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Route de connexion
export const login = async (req: Request, res: Response) => {
    try {
        const { user, token } = await loginUser(req.body);
        res.cookie('auth_token', token, cookieOptions(req.body.rememberMe));
        res.json({ success: true, user });
    } catch (err: any) {
        res.status(401).json({ success: false, message: err.message });
    }
};

// Route de récupération de l'utilisateur actuel
export const me = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            throw new Error('Utilisateur non trouvé');
        }

        const user = await getCurrentUser(req.user.id);
        res.json({ user });
    } catch (err: any) {
        res.status(404).json({ success: false, message: err.message });
    }
};

// Route de déconnexion
export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie('auth_token', cookieOptions());
        const result = logoutUser();
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};
