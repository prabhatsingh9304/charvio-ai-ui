export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const API_ENDPOINTS = {
    SCENES: "/scenes",
    CHARACTERS: "/characters",
    SESSION: "/session",
    CHAT: "/chat",
    UPLOAD: "/upload",
} as const


export const APP_CONFIG = {
    name: "Sim City",
    description: "Browse scenes and characters",
} as const
