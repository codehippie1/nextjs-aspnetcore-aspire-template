export const config = {
  //apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7543',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5451',
  apiTimeout: 5000, // 5 seconds
} as const; 