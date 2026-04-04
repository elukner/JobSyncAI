import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const jobSchema = z.object({
  company: z.string().min(1, { message: "Company name is required." }),
  title: z.string().min(1, { message: "Job title is required." }),
  url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  status: z.enum(['Applied', 'Interviewing', 'Offer', 'Rejected']).default('Applied'),
});