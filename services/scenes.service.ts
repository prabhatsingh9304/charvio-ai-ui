import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { Scene, SceneCreate, SceneUpdate } from "@/types/types"

export async function getScenes(skip = 0, limit = 100): Promise<Scene[]> {
    const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
    return apiClient<Scene[]>(`${API_ENDPOINTS.SCENES}?${params}`)
}

export async function getSceneById(id: string): Promise<Scene> {
    return apiClient<Scene>(`${API_ENDPOINTS.SCENES}/${id}`)
}

export async function createScene(scene: SceneCreate): Promise<Scene> {
    return apiClient<Scene>(API_ENDPOINTS.SCENES, {
        method: "POST",
        body: scene,
    })
}

export async function updateScene(id: string, scene: SceneUpdate): Promise<Scene> {
    return apiClient<Scene>(`${API_ENDPOINTS.SCENES}/${id}`, {
        method: "PUT",
        body: scene,
    })
}

export async function deleteScene(id: string): Promise<void> {
    await apiClient<void>(`${API_ENDPOINTS.SCENES}/${id}`, {
        method: "DELETE",
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
