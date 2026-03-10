import { apiClient } from "./api-client"
import { API_ENDPOINTS } from "./config"
import type { Scene } from "@/types/types"

export async function getScenes(): Promise<Scene[]> {
    return apiClient<Scene[]>(API_ENDPOINTS.SCENES)
}

export async function getSceneById(id: string): Promise<Scene> {
    return apiClient<Scene>(`${API_ENDPOINTS.SCENES}/${id}`)
}

export async function createScene(scene: Partial<Scene>): Promise<Scene> {
    return apiClient<Scene>(API_ENDPOINTS.SCENES, {
        method: "POST",
        body: scene,
    })
}

export async function uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append("file", file)

    return apiClient<{ url: string }>(API_ENDPOINTS.UPLOAD, {
        method: "POST",
        body: formData,
    })
}
