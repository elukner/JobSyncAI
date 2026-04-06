import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getScoreColor(score: number) {
  if (score < 50) return "text-red-500";

  if (score <= 79) return "text-yellow-500";

  if (score >= 80) return "text-green-500";

  return "text-gray-500";
}