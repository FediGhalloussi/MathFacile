import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'changeme';

export const generateToken = (
    user: { id: number; name: string; email: string },
    rememberMe = false
): string => {
    return jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, {
        expiresIn: rememberMe ? '7d' : '1h',
    });
};
