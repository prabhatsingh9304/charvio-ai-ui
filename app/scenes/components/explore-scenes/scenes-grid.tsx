import type { Scene } from "@/types/types";
import { SceneCard } from "@/app/scenes/components/scene-card";

interface ScenesGridProps {
    scenes: Scene[];
    selectedId?: string | null;
    onSelect?: (scene: Scene) => void;
}

export function ScenesGrid({ scenes, selectedId, onSelect }: ScenesGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {scenes.map((scene) => (
                <SceneCard
                    key={scene.id}
                    scene={scene}
                    selected={selectedId === scene.id}
                    onClick={() => onSelect?.(scene)}
                />
            ))}
        </div>
    );
}
