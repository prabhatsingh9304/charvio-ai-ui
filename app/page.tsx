"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Scene, Character } from "@/types/types"
import { getScenes } from "@/lib/scenes-api"
import { getCharacters } from "@/lib/characters-api"
import { createSession } from "@/lib/session-api"
import { Card, CardContent, Button } from "@/components/ui"
import {
  HeroSection,
  LoadingState,
  ErrorState,
  ExploreScenes,
  ExploreCharacters
} from "./components"

export default function Home() {
  const router = useRouter()
  const [scenes, setScenes] = useState<Scene[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creatingSession, setCreatingSession] = useState(false)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)

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

  const handleStartChat = async (character: Character) => {
    try {
      setCreatingSession(true)
      setSelectedCharacterId(character.id)
      const session = await createSession(character.scene_id)
      router.push(`/chat?session=${session.session_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session")
    } finally {
      setCreatingSession(false)
      setSelectedCharacterId(null)
    }
  }

  const getSceneForCharacter = (sceneId: string) => {
    return scenes.find(s => s.id === sceneId)
  }

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex flex-col items-center">

      <div className="w-full md:w-8/9 flex flex-col mt-10 mb-10">
        {/* Scenes Section */}
        <ExploreScenes scenes={scenes} variant="carousel" />

        {/* Characters Section */}
        <ExploreCharacters
          characters={characters}
          scenes={scenes}
          creatingSession={creatingSession}
          selectedCharacterId={selectedCharacterId}
          onStartChat={handleStartChat}
          variant="carousel"
        />
      </div>
    </div>
  )
}
