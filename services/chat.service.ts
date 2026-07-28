import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
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
