// config/demo.ts
// EXPO_PUBLIC_DEMO defaults to false if not set
export const IS_DEMO = (process.env.EXPO_PUBLIC_DEMO ?? 'false') === 'true';
