import type { Request } from "express"; // Mandatory, dont remove !!!!

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                name: string;
            };
        }
    }
}
