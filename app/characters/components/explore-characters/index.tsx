"use client"

import type { Character, Scene } from "@/types/types";
import { CharacterListContent } from "./character-list-content";
import { SectionHeader } from "./section-header";

interface ExploreCharactersProps {
    characters: Character[];
    scenes: Scene[];
    creatingSession: boolean;
    selectedCharacterId: string | null;
    onStartChat: (character: Character) => void;
    onSelect?: (character: Character) => void;
    hideHeader?: boolean;
    variant?: 'grid' | 'carousel';
}

export function ExploreCharacters({
    characters,
    scenes,
    creatingSession,
    selectedCharacterId,
    onStartChat,
    onSelect,
    hideHeader = false,
    variant = 'grid'
}: ExploreCharactersProps) {
    return (
        <section>
            <SectionHeader hideHeader={hideHeader} />
            <CharacterListContent
                characters={characters}
                scenes={scenes}
                variant={variant}
                creatingSession={creatingSession}
                selectedCharacterId={selectedCharacterId}
                onStartChat={onStartChat}
                onSelect={onSelect}
            />
        </section>
    );
}
