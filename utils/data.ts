import type { Scene } from "@/types/types"

export function getSceneById(scenes: Scene[], sceneId: string): Scene | undefined {
    return scenes.find((scene) => scene.id === sceneId)
}
