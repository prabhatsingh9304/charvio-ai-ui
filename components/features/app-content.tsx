"use client"

import { useState, useEffect } from "react"
import type { Scene, Character, SessionResponse } from "@/types/types"
import { Tabs } from "@/components/ui/tabs"
import { SceneCard } from "@/app/components/scene-card"
import { CharacterCard } from "@/app/components/character-card"
import { ChatInterface } from "@/app/chat/chat-interface"
import { getScenes } from "@/lib/scenes-api"
import { getCharacters } from "@/lib/characters-api"
import { createSession } from "@/lib/session-api"

export function AppContent() {
    const [scenes, setScenes] = useState<Scene[]>([])
    const [characters, setCharacters] = useState<Character[]>([])
    const [selectedScene, setSelectedScene] = useState<Scene | null>(null)
    const [activeSession, setActiveSession] = useState<SessionResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const [scenesData, charactersData] = await Promise.all([
                    getScenes(),
                    getCharacters()
                ])
                setScenes(scenesData)
                setCharacters(charactersData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch data")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSceneSelect = (scene: Scene) => {
        setSelectedScene(selectedScene?.id === scene.id ? null : scene)
    }

    const handleCharacterClick = async (character: Character) => {
        try {
            setLoading(true)
            // Create session with the character's scene
            const session = await createSession(character.scene_id)
            setActiveSession(session)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create session")
        } finally {
            setLoading(false)
        }
    }

    const handleBackToCharacters = () => {
        setActiveSession(null)
    }

    const filteredCharacters = selectedScene
        ? characters.filter(char => char.scene_id === selectedScene.id)
        : characters

    // If we have an active chat session, show the chat interface
    if (activeSession) {
        return (
            <ChatInterface
                session={activeSession}
                onBack={handleBackToCharacters}
            />
        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                    <p className="text-rose-600 font-medium">Error loading data</p>
                    <p className="mt-2 text-sm text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    const tabs = [
        {
            id: "home",
            label: "Home",
            content: (
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to Sim City
                    </h1>
                    <p className="text-lg text-gray-600">
                        Explore immersive scenes and meet fascinating characters in this interactive world.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                        <div className="p-6 rounded-xl bg-white border border-pink-200 shadow-sm">
                            <div className="text-3xl font-bold text-gray-900">{scenes.length}</div>
                            <div className="text-sm text-pink-700 mt-1">Scenes</div>
                        </div>
                        <div className="p-6 rounded-xl bg-white border border-rose-200 shadow-sm">
                            <div className="text-3xl font-bold text-gray-900">{characters.length}</div>
                            <div className="text-sm text-rose-700 mt-1">Characters</div>
                        </div>
                        <div className="p-6 rounded-xl bg-white border border-pink-200 shadow-sm">
                            <div className="text-3xl font-bold text-gray-900">∞</div>
                            <div className="text-sm text-pink-700 mt-1">Stories</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "scenes",
            label: "Scenes",
            content: (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Scenes
                        </h2>
                        {selectedScene && (
                            <button
                                onClick={() => setSelectedScene(null)}
                                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Clear selection
                            </button>
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
                                    onClick={() => handleSceneSelect(scene)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )
        },
        {
            id: "characters",
            label: "Characters",
            content: (
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
                            <button
                                onClick={() => setSelectedScene(null)}
                                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Show all characters
                            </button>
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
                                        onStartChat={handleCharacterClick}
                                        isCreating={loading}
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
            )
        }
    ]

    return <Tabs tabs={tabs} defaultTab="home" />
}
