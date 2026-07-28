export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  SCENES: "/scenes",
  CHARACTERS: "/characters",
  SESSION: "/session",
  CHAT: "/chat",
  UPLOAD: "/upload",
  SUGGESTIONS: "/suggestions",
  AUTH_FIREBASE: "/auth/firebase",
  USERS_ME: "/users/me",
  CONVERSATIONS: "/conversations",
  PROMPTS: "/prompts",
  CREDITS: "/credits",
  PAYMENTS: "/payments",
  PLANS: "/plans",
  SUBSCRIPTIONS: "/subscriptions",
} as const;
