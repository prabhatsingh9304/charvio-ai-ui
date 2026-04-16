"use client"

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Character, Scene } from "@/types/types";
import { Card, CardContent, Button } from "@/components/ui";
import { CharacterCard } from "./character-card";

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
    const router = useRouter();

    const getSceneForCharacter = (sceneId: string) => {
        return scenes.find(s => s.id === sceneId);
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // buffer
        }
    };

    useEffect(() => {
        if (variant === 'carousel') {
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, [characters, variant]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600; // Adjust as needed
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const Content = () => {
        if (characters.length === 0) {
            return (
                <Card className="text-center py-12">
                    <CardContent>
                        <div className="text-5xl mb-4">👥</div>
                        <p className="text-zinc-400">No characters available</p>
                    </CardContent>
                </Card>
            );
        }

        if (variant === 'grid') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {characters.map((character) => {
                        const scene = getSceneForCharacter(character.scene_id);
                        const isCreating = creatingSession && selectedCharacterId === character.id;

                        return (
                            <CharacterCard
                                key={character.id}
                                character={character}
                                scene={scene}
                                isCreating={isCreating}
                                onStartChat={onStartChat}
                                selected={selectedCharacterId === character.id}
                                onClick={() => onSelect?.(character)}
                            />
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="relative group">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all -ml-2"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="overflow-x-auto pb-4 px-4 [&::-webkit-scrollbar]:hidden scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-4 min-w-max">
                        {characters.map((character) => {
                            const scene = getSceneForCharacter(character.scene_id);
                            const isCreating = creatingSession && selectedCharacterId === character.id;

                            return (
                                <div key={character.id} className="w-[320px] md:w-[360px]">
                                    <CharacterCard
                                        character={character}
                                        scene={scene}
                                        isCreating={isCreating}
                                        onStartChat={onStartChat}
                                        selected={selectedCharacterId === character.id}
                                        onClick={() => onSelect?.(character)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all -mr-2"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                )}
            </div>
        );
    };

    return (
        <section>
            {!hideHeader && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                            Meet Characters
                        </h2>
                        <p className="text-sm text-black/60">
                            Start a conversation with any character
                        </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/characters")}>
                        View All →
                    </Button>
                </div>
            )}
            <Content />
        </section>
    );
}
