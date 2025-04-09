import {describe, expect, it} from "vitest";

function sum(a: number, b: number): number {
    return a + b;
}

describe('sum()', () => {
    it('devrait additionner deux nombres', () => {
        expect(sum(2, 3)).toBe(5);
    });

    it('devrait retourner un nombre négatif si les deux sont négatifs', () => {
        expect(sum(-2, -5)).toBe(-7);
    });
});
