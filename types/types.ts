export type Scene = {
    id: string
    name: string
    description: string
    setting: string
    mood: string
    image?: string | null
    created_at: string
    updated_at: string
}

export type Character = {
    id: string
    name: string
    description: string
    personality: string
    background: string
    scene_id: string
    image?: string | null
    chats_example?: Record<string, any>[] | null
    created_at: string
    updated_at: string
}

export type ApiResponse<T> = {
    data: T
    error?: string
}

// Chat-related types
export type SessionCreate = {
    scene_id: string
}

export type SessionResponse = {
    session_id: string
    scene_id: string
    scene_vars: Record<string, unknown>
    characters: Record<string, {
        name: string
        personality: string
        background: string
        image?: string | null
    }>
    tension: number
    next_actor: string
}

export type ChatMessage = {
    speaker: string
    message: string
    timestamp: Date
}

export type ChatRequest = {
    session_id: string
    message: string
}

export type ChatResponse = {
    session_id: string
    speaker: string
    message: string
    tension: number
    scene_vars: Record<string, unknown>
    next_actor: string
}
