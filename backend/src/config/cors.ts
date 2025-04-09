import cors from 'cors';

export default cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
});
