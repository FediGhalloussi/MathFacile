import cors from 'cors';

export default cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4173',
    credentials: true,
});
