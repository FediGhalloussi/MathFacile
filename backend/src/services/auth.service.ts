import { db } from '../db/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export const registerUser = async ({ name, email, password }: RegisterInput) => {
    if (!name || !email || !password) {
        throw new Error('Champs manquants');
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email déjà utilisé');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const token = generateToken(newUser);

    return {
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        },
        token,
    };
};

export const loginUser = async ({ email, password, rememberMe = false }: LoginInput) => {
    if (!email || !password) {
        throw new Error('Champs manquants');
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error('Utilisateur non trouvé');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Mot de passe incorrect');

    const token = generateToken(user, rememberMe);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};

export const getCurrentUser = async (userId: number) => {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new Error('Utilisateur introuvable');
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};

export const logoutUser = () => {
    return { message: 'Déconnexion réussie' };
};
