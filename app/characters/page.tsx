"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Character, Scene } from "@/types/types"
import { getCharacters } from "@/lib/characters-api"
import { getScenes } from "@/lib/scenes-api"
import { createSession } from "@/lib/session-api"
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar, Accordion } from "@/components/ui"
import { LoadingState, ErrorState, PageHeader, ExploreCharacters } from "../components"

export default function CharactersPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sceneFilter = searchParams.get("scene")

    const [characters, setCharacters] = useState<Character[]>([])
    const [scenes, setScenes] = useState<Scene[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
    const [creatingSession, setCreatingSession] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const [charactersData, scenesData] = await Promise.all([
                    getCharacters(),
                    getScenes()
                ])
                setCharacters(charactersData)
                setScenes(scenesData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch data")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredCharacters = sceneFilter
        ? characters.filter(char => char.scene_id === sceneFilter)
        : characters

    const getSceneForCharacter = (sceneId: string) => {
        return scenes.find(s => s.id === sceneId)
    }

    const handleStartChat = async (character: Character) => {
        try {
            setCreatingSession(true)
            const session = await createSession(character.scene_id)
            router.push(`/chat?session=${session.session_id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create session")
        } finally {
            setCreatingSession(false)
        }
    }

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState error={error} />
    }

    const filterScene = sceneFilter ? scenes.find(s => s.id === sceneFilter) : null

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950">
            <div className="container md:w-8/9 mx-auto px-4 py-8">
                {/* Header */}
                <PageHeader
                    title="Meet the Characters"
                    description={
                        filterScene
                            ? `Characters in ${filterScene.name}`
                            : "Discover unique personalities and their stories"
                    }
                    onBack={() => router.push("/")}
                    actions={
                        sceneFilter && (
                            <Button variant="secondary" onClick={() => router.push("/characters")}>
                                Show All
                            </Button>
                        )
                    }
                />

                {/* Characters Grid */}
                <ExploreCharacters
                    characters={filteredCharacters}
                    scenes={scenes}
                    creatingSession={creatingSession}
                    selectedCharacterId={selectedCharacter?.id || null}
                    onStartChat={handleStartChat}
                    onSelect={(char: Character) => setSelectedCharacter(selectedCharacter?.id === char.id ? null : char)}
                    hideHeader
                />
            </div>
        </div>
    )
}
