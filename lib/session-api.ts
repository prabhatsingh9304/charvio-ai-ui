import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "./config"
import type { SessionCreate, SessionResponse } from "@/types/types"

export async function createSession(sceneId: string): Promise<SessionResponse> {
    return apiClient<SessionResponse>(`${API_ENDPOINTS.SESSION}/start`, {
        method: "POST",
        body: { scene_id: sceneId } as SessionCreate,
    })
}

export async function getSession(sessionId: string): Promise<SessionResponse> {
    return apiClient<SessionResponse>(`${API_ENDPOINTS.SESSION}/${sessionId}`)
}
