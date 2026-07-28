"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Scene, Character } from "@/types/types"
import { getScenes } from "@/services/scenes.service"
import { getCharacters } from "@/services/characters.service"
import { createSession } from "@/services/session.service"
import { listConversations } from "@/services/conversations.service"

import {
  LoadingState,
  ErrorState
} from "@/components/common"
import { ExploreCharacters } from "./characters/components"
import { ExploreScenes } from "./scenes/components/explore-scenes"

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

      const { conversations } = await listConversations({ character_id: character.id, limit: 1 })
      const recentConversationId = conversations.length > 0 ? conversations[0].id : undefined

      const session = await createSession(character.id, character.scene_id ?? undefined, recentConversationId)
      router.push(`/chat?session=${session.session_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session")
    } finally {
      setCreatingSession(false)
      setSelectedCharacterId(null)
    }
  }

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">

      <div className="w-full md:w-8/9 flex flex-col px-4 md:px-0 mt-6 md:mt-10 mb-6 md:mb-10">
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
