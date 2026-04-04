import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const authSchema = z.object({
 email: z.email({ error: "Invalid email address" }),
  password: z.string()
    .min(8, "Must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});