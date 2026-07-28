import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { PromptResponse } from "@/types/types"

export async function listPrompts(): Promise<string[]> {
    return apiClient<string[]>(API_ENDPOINTS.PROMPTS)
}

export async function getPrompt(name: string): Promise<PromptResponse> {
    return apiClient<PromptResponse>(`${API_ENDPOINTS.PROMPTS}/${name}`)
}

export async function updatePrompt(
    name: string,
    content: string
): Promise<PromptResponse> {
    return apiClient<PromptResponse>(`${API_ENDPOINTS.PROMPTS}/${name}`, {
        method: "PUT",
        body: { content },
    })
}

export async function restorePromptBackup(name: string): Promise<PromptResponse> {
    return apiClient<PromptResponse>(`${API_ENDPOINTS.PROMPTS}/${name}/restore`, {
        method: "POST",
    })
}
