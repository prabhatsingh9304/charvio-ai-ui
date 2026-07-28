"use client"

import { useState, useEffect } from "react"
import type { Scene, Character, SessionResponse } from "@/types/types"
import { Tabs } from "@/components/ui/tabs"
import { ChatInterface } from "@/app/chat/components/chat-interface"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorState } from "@/components/common/error-state"
import { HomeTab } from "./app-content/home-tab"
import { ScenesTab } from "./app-content/scenes-tab"
import { CharactersTab } from "./app-content/characters-tab"
import { getScenes } from "@/services/scenes.service"
import { getCharacters } from "@/services/characters.service"
import { createSession } from "@/services/session.service"

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
            const session = await createSession(character.id, character.scene_id ?? undefined)
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

    const handleNewChat = () => {
        setActiveSession(null)
    }

    // If we have an active chat session, show the chat interface
    if (activeSession) {
        return (
            <ChatInterface
                session={activeSession}
                onBack={handleBackToCharacters}
                onNewChat={handleNewChat}
            />
        )
    }

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState error={error} />
    }

    const tabs = [
        {
            id: "home",
            label: "Home",
            content: <HomeTab sceneCount={scenes.length} characterCount={characters.length} />
        },
        {
            id: "scenes",
            label: "Scenes",
            content: (
                <ScenesTab
                    scenes={scenes}
                    selectedScene={selectedScene}
                    onSceneSelect={handleSceneSelect}
                    onClearSelection={() => setSelectedScene(null)}
                />
            )
        },
        {
            id: "characters",
            label: "Characters",
            content: (
                <CharactersTab
                    characters={characters}
                    scenes={scenes}
                    selectedScene={selectedScene}
                    onCharacterClick={handleCharacterClick}
                    onClearSelection={() => setSelectedScene(null)}
                    isCreating={loading}
                />
            )
        }
    ]

    return <Tabs tabs={tabs} defaultTab="home" />
}
