import { jobSchema } from '@/lib/schemas/jobSchema'
import { describe, it, expect, test } from 'vitest';

//Test where it passes a perfectly valid job object. Assert that result.success is true. 
describe('UserSchema Validation', () => {
    test('should pass with a valid object', () => {
        const validJob = {
            company: "Rakuten Advertising",
            title: "Intern - Software Engineering",
            url: "https://www.linkedin.com/jobs/view/4388101850",
            description: "Rakuten International is a division of Rakuten Group, Inc., " +
                "a Japanese global technology leader in services that empower individuals, communities, businesses and society.",
            status: 'Applied',
        };
        const result = jobSchema.safeParse(validJob);
        expect(result.success).toBe(true);
    });

    //Test where the company field is an empty string "". Assert that result.success is false.
    test('company field is an empty string', () => {
        const validJob = {
            company: "",
            title: "Software Engineer",
            url: "https://www.linkedin.com/jobs/view/4387871244",
            description: "Develops and maintains software applications and services for internal and external credit union use, having an emphasis on building quality systems with security and performance in mind.",
            status: 'Applied',
        };
        const result = jobSchema.safeParse(validJob);
        expect(result.success).toBe(false);
    });

    //Test where the url field is "I-am-not-a-link". Assert that result.success is false.
    test('url field is not a valid link', () => {
        const validJob = {
            company: "Test Company",
            title: "Engineer I",
            url: "I-am-not-a-link",
            description: "Develops and maintains software applications and services for internal and external credit union use, having an emphasis on building quality systems with security and performance in mind.",
            status: 'Applied',
        };
        const result = jobSchema.safeParse(validJob);
        expect(result.success).toBe(false);
    });
});