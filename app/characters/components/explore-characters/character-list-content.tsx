"use client"

import { useRef, useState, useEffect } from "react"
import type { Character, Scene } from "@/types/types"
import { Card, CardContent } from "@/components/ui"
import { CharacterCard } from "../character-card"
import { CarouselNavigation } from "./carousel-navigation"

interface CharacterListContentProps {
    characters: Character[]
    scenes: Scene[]
    variant: 'grid' | 'carousel'
    creatingSession: boolean
    selectedCharacterId: string | null
    onStartChat: (character: Character) => void
    onSelect?: (character: Character) => void
}

export function CharacterListContent({
    characters,
    scenes,
    variant,
    creatingSession,
    selectedCharacterId,
    onStartChat,
    onSelect
}: CharacterListContentProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const getSceneForCharacter = (sceneId: string | null | undefined) => {
        if (!sceneId) return undefined
        return scenes.find(s => s.id === sceneId)
    }

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        if (variant === 'carousel') {
            checkScroll()
            window.addEventListener('resize', checkScroll)
            return () => window.removeEventListener('resize', checkScroll)
        }
    }, [characters, variant])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    if (characters.length === 0) {
        return (
            <Card className="text-center py-12">
                <CardContent>
                    <div className="text-5xl mb-4">👥</div>
                    <p className="text-zinc-400">No characters available</p>
                </CardContent>
            </Card>
        )
    }

    if (variant === 'grid') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => {
                    const scene = getSceneForCharacter(character.scene_id)
                    const isCreating = creatingSession && selectedCharacterId === character.id

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
                    )
                })}
            </div>
        )
    }

    return (
        <div className="relative group">
            <CarouselNavigation
                showLeftArrow={showLeftArrow}
                showRightArrow={showRightArrow}
                onScrollLeft={() => scroll('left')}
                onScrollRight={() => scroll('right')}
            />

            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="overflow-x-auto pb-4 px-4 [&::-webkit-scrollbar]:hidden scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-4 min-w-max">
                    {characters.map((character) => {
                        const scene = getSceneForCharacter(character.scene_id)
                        const isCreating = creatingSession && selectedCharacterId === character.id

                        return (
                            <div key={character.id} className="w-[260px] sm:w-[320px] md:w-[360px]">
                                <CharacterCard
                                    character={character}
                                    scene={scene}
                                    isCreating={isCreating}
                                    onStartChat={onStartChat}
                                    selected={selectedCharacterId === character.id}
                                    onClick={() => onSelect?.(character)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
