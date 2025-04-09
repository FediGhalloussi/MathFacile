import express from 'express';
import corsConfig from './config/cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route';
import { db } from './db/db';
import type { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
if (!PORT) throw new Error("PORT non défini dans .env");

app.use(corsConfig);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// Middleware d'erreur global
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
}

app.use(errorHandler);

['SIGINT', 'SIGTERM', 'beforeExit'].forEach((signal) => {
    process.on(signal, async () => {
        await db.$disconnect();
        process.exit(0);
    });
});

export default app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
    });
}
