import request from 'supertest';
import app from '../../server';
import {describe, expect, it} from "vitest";

describe('POST /api/auth/register', () => {
    it('devrait répondre avec 200 et un utilisateur', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Jean',
                email: 'jean@test.com',
                password: '123456',
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toHaveProperty('email', 'jean@test.com');
    });
});
