import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type {
    ConversationCreate,
    ConversationUpdate,
    ConversationResponse,
    ConversationDetailResponse,
    ConversationListResponse,
    MessageResponse,
} from "@/types/types"

export async function createConversation(
    data: ConversationCreate
): Promise<ConversationResponse> {
    return apiClient<ConversationResponse>(API_ENDPOINTS.CONVERSATIONS, {
        method: "POST",
        body: data,
    })
}

export async function listConversations(params?: {
    character_id?: string
    scene_id?: string
    skip?: number
    limit?: number
}): Promise<ConversationListResponse> {
    const searchParams = new URLSearchParams()
    if (params?.character_id) searchParams.set("character_id", params.character_id)
    if (params?.scene_id) searchParams.set("scene_id", params.scene_id)
    if (params?.skip !== undefined) searchParams.set("skip", String(params.skip))
    if (params?.limit !== undefined) searchParams.set("limit", String(params.limit))

    const query = searchParams.toString()
    const endpoint = query
        ? `${API_ENDPOINTS.CONVERSATIONS}?${query}`
        : API_ENDPOINTS.CONVERSATIONS

    return apiClient<ConversationListResponse>(endpoint)
}

export async function getConversation(
    conversationId: string,
    messageLimit?: number
): Promise<ConversationDetailResponse> {
    const query = messageLimit ? `?message_limit=${messageLimit}` : ""
    return apiClient<ConversationDetailResponse>(
        `${API_ENDPOINTS.CONVERSATIONS}/${conversationId}${query}`
    )
}

export async function getConversationMessages(
    conversationId: string,
    params?: { skip?: number; limit?: number }
): Promise<MessageResponse[]> {
    const searchParams = new URLSearchParams()
    if (params?.skip !== undefined) searchParams.set("skip", String(params.skip))
    if (params?.limit !== undefined) searchParams.set("limit", String(params.limit))

    const query = searchParams.toString()
    const endpoint = query
        ? `${API_ENDPOINTS.CONVERSATIONS}/${conversationId}/messages?${query}`
        : `${API_ENDPOINTS.CONVERSATIONS}/${conversationId}/messages`

    return apiClient<MessageResponse[]>(endpoint)
}

export async function updateConversation(
    conversationId: string,
    data: ConversationUpdate
): Promise<ConversationResponse> {
    return apiClient<ConversationResponse>(
        `${API_ENDPOINTS.CONVERSATIONS}/${conversationId}`,
        { method: "PATCH", body: data }
    )
}

export async function deleteConversation(conversationId: string): Promise<void> {
    await apiClient<void>(
        `${API_ENDPOINTS.CONVERSATIONS}/${conversationId}`,
        { method: "DELETE" }
    )
}
