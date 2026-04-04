import { authSchema } from '@/lib/schemas/authSchema'
import { describe, test, expect } from 'vitest'

describe('AuthSchema Validation', () => {

    // --- THE HAPPY PATH ---
    test('should pass with a perfectly valid email and strong password', () => {
        //Test object with a standard email and a password that hits EVERY rule (8+ chars, upper, lower, number, special).
        const validAuth = {
            email: "test1@test.com",
            password: "1vn%QUZ&Mn3*#9",
        };
        const result = authSchema.safeParse(validAuth);//SafeParse it and expect success to be true.
        expect(result.success).toBe(true);
    })

    // --- EMAIL VALIDATION ---
    test('should fail if email format is invalid', () => {
        const validAuth = {
            email: "johndoe.com",
            password: "aON8wrEQ#&4Ng8",
        };
        const result = authSchema.safeParse(validAuth);
        expect(result.success).toBe(false);
    })

    // --- PASSWORD LENGTH ---
    test('should fail if password is too short', () => {
        const validAuth = {
            email: "Doorstep1280@test.com",
            password: "Abc1!",
        };
        const result = authSchema.safeParse(validAuth);
        expect(result.success).toBe(false);
    })

    // --- PASSWORD REGEX GAUNTLET ---
    test('should fail if password is missing an uppercase letter', () => {
        // Test a long password with uppercase, numbers, and special chars, but no uppercase.
        const validAuth = {
            email: "Cultivate9439@test.com",
            password: "$i#^6n2*nmbaak",
        };
        const result = authSchema.safeParse(validAuth);
        expect(result.success).toBe(false);
    })

    test('should fail if password is missing a lowercase letter', () => {
        // Test a long password with uppercase, numbers, and special chars, but NO lowercase.
        const validAuth = {
            email: "Outward6547@test.com",
            password: "HS3D4T1^Z9J$N#",
        };
        const result = authSchema.safeParse(validAuth);
        expect(result.success).toBe(false);
    })

    test('should fail if password is missing a number', () => {
        // Test a long password with uppercase, lowercase, and special chars, but NO numbers.
        const validAuth = {
            email: "Wipe3514@test.com",
            password: "@qq$*r!qEYqTPW",
        };
        const result = authSchema.safeParse(validAuth);
        expect(result.success).toBe(false);
    })

    test('should fail if password is missing a special character', () => {
        // Test a long password with uppercase, lowercase, and numbers, but NO special characters.
        const validAuth = {
            email: "Gulp8303@test.com",
            password: "XClH7nB8D3QPnk",
        };
        const result = authSchema.safeParse(validAuth);
        expect(result.success).toBe(false);
    })

})