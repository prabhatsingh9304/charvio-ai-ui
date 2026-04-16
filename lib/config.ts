export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

console.log(API_BASE_URL)
export const API_ENDPOINTS = {
    SCENES: "/scenes",
    CHARACTERS: "/characters",
    SESSION: "/session",
    CHAT: "/chat",
    UPLOAD: "/upload",
    SUGGESTIONS: "/suggestions",
} as const


export const APP_CONFIG = {
    name: "Sim City",
    description: "Browse scenes and characters",
} as const
