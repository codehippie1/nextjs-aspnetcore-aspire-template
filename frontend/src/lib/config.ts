export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7543',
  apiTimeout: 5000, // 5 seconds
} as const; 