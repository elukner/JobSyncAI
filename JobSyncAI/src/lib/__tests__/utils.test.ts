import { describe, it, expect } from 'vitest';
import { getScoreColor } from '../utils';

describe('getScoreColor helper function', () => {

    it('returns red for scores under 50', () => {

        const result = getScoreColor(40);

        expect(result).toBe("text-red-500");
    });

    it('returns yellow for scores between 50 and 79', () => {

    });

    it('returns green for scores 80 and above', () => {

    });

});