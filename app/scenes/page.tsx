"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Scene } from "@/types/types"
import { getScenes } from "@/lib/scenes-api"
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui"
import { LoadingState, ErrorState, PageHeader, ExploreScenes } from "../components"

export default function ScenesPage() {
    const router = useRouter()
    const [scenes, setScenes] = useState<Scene[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedScene, setSelectedScene] = useState<Scene | null>(null)

    useEffect(() => {
        async function fetchScenes() {
            try {
                setLoading(true)
                const data = await getScenes()
                setScenes(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch scenes")
            } finally {
                setLoading(false)
            }
        }
        fetchScenes()
    }, [])

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState error={error} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950">
            <div className="container md:w-8/9 mx-auto px-4 py-8">
                {/* Header */}
                <PageHeader
                    title="Explore Scenes"
                    description="Discover immersive worlds and their unique atmospheres"
                    onBack={() => router.push("/")}
                    stats={[
                        { value: scenes.length, label: "Total Scenes" }
                    ]}
                />

                {/* Explore Scenes */}
                <ExploreScenes
                    scenes={scenes}
                    selectedId={selectedScene?.id}
                    onSelect={setSelectedScene}
                    hideHeader
                />
            </div>
        </div>
    )
}
