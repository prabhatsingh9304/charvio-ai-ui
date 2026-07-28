import type { Scene, Character } from "@/types/types"
import { CharacterCard } from "@/app/characters/components/character-card"
import { Button } from "@/components/ui/button"

interface CharactersTabProps {
    characters: Character[]
    scenes: Scene[]
    selectedScene: Scene | null
    onCharacterClick: (character: Character) => void
    onClearSelection: () => void
    isCreating: boolean
}

export function CharactersTab({ 
    characters, 
    scenes, 
    selectedScene, 
    onCharacterClick, 
    onClearSelection,
    isCreating 
}: CharactersTabProps) {
    const filteredCharacters = selectedScene
        ? characters.filter(char => char.scene_id === selectedScene.id)
        : characters

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                    Characters
                    {selectedScene && (
                        <span className="ml-3 text-base font-normal text-gray-500">
                            in {selectedScene.name}
                        </span>
                    )}
                </h2>
                {selectedScene && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearSelection}
                    >
                        Show all characters
                    </Button>
                )}
            </div>
            {filteredCharacters.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                    {selectedScene
                        ? `No characters found in ${selectedScene.name}`
                        : "No characters available"
                    }
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCharacters.map((character) => {
                        const characterScene = scenes.find(s => s.id === character.scene_id)
                        return (
                            <CharacterCard
                                key={character.id}
                                character={character}
                                scene={characterScene}
                                onStartChat={onCharacterClick}
                                isCreating={isCreating}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
