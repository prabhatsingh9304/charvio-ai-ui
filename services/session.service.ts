import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { SessionCreate, SessionResponse } from "@/types/types"

export async function createSession(
    characterId: string,
    sceneId?: string,
    conversationId?: string
): Promise<SessionResponse> {
    const body: SessionCreate = { character_id: characterId }
    if (sceneId) {
        body.scene_id = sceneId
    }
    if (conversationId) {
        body.conversation_id = conversationId
    }
    return apiClient<SessionResponse>(`${API_ENDPOINTS.SESSION}/start`, {
        method: "POST",
        body,
    })
}

export async function getSession(sessionId: string): Promise<SessionResponse> {
    return apiClient<SessionResponse>(`${API_ENDPOINTS.SESSION}/${sessionId}`)
}
