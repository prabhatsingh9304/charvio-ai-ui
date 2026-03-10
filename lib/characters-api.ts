import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "./config"
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
