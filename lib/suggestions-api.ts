import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "./config"
import type { SuggestionRequest, SuggestionResponse } from "@/types/types"

export async function fetchSuggestions(
    sessionId: string,
    numSuggestions: number = 3
): Promise<SuggestionResponse> {
    return apiClient<SuggestionResponse>(API_ENDPOINTS.SUGGESTIONS, {
        method: "POST",
        body: { session_id: sessionId, num_suggestions: numSuggestions } as SuggestionRequest,
    })
}

export async function markSuggestionUsed(suggestionId: string): Promise<void> {
    await apiClient<{ success: boolean; message: string }>(
        `${API_ENDPOINTS.SUGGESTIONS}/${suggestionId}/use`,
        { method: "POST" }
    )
}
