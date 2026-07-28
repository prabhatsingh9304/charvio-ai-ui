import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { Character } from "@/types/types"

export async function getCharacters(sceneId?: string): Promise<Character[]> {
    const endpoint = sceneId
        ? `${API_ENDPOINTS.CHARACTERS}?scene_id=${sceneId}`
        : API_ENDPOINTS.CHARACTERS

    return apiClient<Character[]>(endpoint)
}

export async function getCharacterById(id: string): Promise<Character> {
    return apiClient<Character>(`${API_ENDPOINTS.CHARACTERS}/${id}`)
}

export async function createCharacter(character: Partial<Character>): Promise<Character> {
    return apiClient<Character>(API_ENDPOINTS.CHARACTERS, {
        method: "POST",
        body: character,
    })
}

export async function updateCharacter(id: string, character: Partial<Character>): Promise<Character> {
    return apiClient<Character>(`${API_ENDPOINTS.CHARACTERS}/${id}`, {
        method: "PUT",
        body: character,
    })
}

export async function deleteCharacter(id: string): Promise<void> {
    await apiClient<void>(`${API_ENDPOINTS.CHARACTERS}/${id}`, {
        method: "DELETE",
    })
}
