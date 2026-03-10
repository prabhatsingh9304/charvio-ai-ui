"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getSession } from "@/lib/session-api"
import { getSceneById } from "@/lib/scenes-api"
import { ChatInterface } from "@/app/chat/chat-interface"
import { LoadingState } from "../components/loading-state"
import { ErrorState } from "../components/error-state"
import type { SessionResponse } from "@/types/types"

function ChatPageContent() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session")
    const router = useRouter()

    const [session, setSession] = useState<SessionResponse | null>(null)
    const [sceneName, setSceneName] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSessionData() {
            if (!sessionId) {
                setError("No session ID provided")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                // 1. Get Session
                const sessionData = await getSession(sessionId)
                setSession(sessionData)

                // 2. Get Scene details for the name
                const sceneData = await getSceneById(sessionData.scene_id)
                setSceneName(sceneData.name)
            } catch (err) {
                console.error("Failed to load chat session:", err)
                setError(err instanceof Error ? err.message : "Failed to load chat session")
            } finally {
                setLoading(false)
            }
        }

        fetchSessionData()
    }, [sessionId])

    const handleBack = () => {
        router.push("/")
    }

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState error={error} />
    }

    if (!session) {
        return <ErrorState error="Session not found" />
    }

    return (
        <ChatInterface
            session={session}
            sceneName={sceneName}
            onBack={handleBack}
        />
    )
}

export default function ChatPage() {
    return (
        <Suspense fallback={<LoadingState />}>
            <ChatPageContent />
        </Suspense>
    )
}
