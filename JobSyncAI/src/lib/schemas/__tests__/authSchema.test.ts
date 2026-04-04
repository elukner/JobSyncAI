import { authSchema } from '@/lib/schemas/authSchema'
import { describe, test, expect } from 'vitest'

describe('AuthSchema Validation', () => {
  
  test('should pass with a perfectly valid email and strong password', () => {
    // TODO: Create a test object with a standard email and a password that hits EVERY rule (8+ chars, upper, lower, number, special).
    // TODO: safeParse it and expect success to be true.
  })

  // --- EMAIL VALIDATION ---
  test('should fail if email format is invalid', () => {
    // TODO: Give it an email like "johndoe.com" (missing the @).
    // TODO: safeParse it and expect success to be false.
  })

  // --- PASSWORD LENGTH ---
  test('should fail if password is too short', () => {
    // TODO: Give it a password like "Abc1!" (It has all the required types of characters, but is only 5 chars long).
    // TODO: safeParse it and expect success to be false.
  })

  // --- PASSWORD REGEX GAUNTLET ---
  test('should fail if password is missing an uppercase letter', () => {
    // TODO: Give it a long password with lowercase, numbers, and special chars, but NO uppercase.
  })

  test('should fail if password is missing a lowercase letter', () => {
    // TODO: Give it a long password with uppercase, numbers, and special chars, but NO lowercase.
  })

  test('should fail if password is missing a number', () => {
    // TODO: Give it a long password with uppercase, lowercase, and special chars, but NO numbers.
  })

  test('should fail if password is missing a special character', () => {
    // TODO: Give it a long password with uppercase, lowercase, and numbers, but NO special characters.
  })

})