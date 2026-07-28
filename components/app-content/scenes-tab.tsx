import type { Scene } from "@/types/types"
import { SceneCard } from "@/app/scenes/components/scene-card"
import { Button } from "@/components/ui/button"

interface ScenesTabProps {
    scenes: Scene[]
    selectedScene: Scene | null
    onSceneSelect: (scene: Scene) => void
    onClearSelection: () => void
}

export function ScenesTab({ scenes, selectedScene, onSceneSelect, onClearSelection }: ScenesTabProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                    Scenes
                </h2>
                {selectedScene && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearSelection}
                    >
                        Clear selection
                    </Button>
                )}
            </div>
            {scenes.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                    No scenes available
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scenes.map((scene) => (
                        <SceneCard
                            key={scene.id}
                            scene={scene}
                            selected={selectedScene?.id === scene.id}
                            onClick={() => onSceneSelect(scene)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
