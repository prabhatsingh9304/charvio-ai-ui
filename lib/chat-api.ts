import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "./config"
import type { ChatRequest, ChatResponse } from "@/types/types"

export async function sendMessage(
    sessionId: string,
    message: string
): Promise<ChatResponse> {
    return apiClient<ChatResponse>(API_ENDPOINTS.CHAT, {
        method: "POST",
        body: { session_id: sessionId, message } as ChatRequest,
    })
}
