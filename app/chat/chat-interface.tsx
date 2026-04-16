"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { ChatMessage, SessionResponse, Suggestion } from "@/types/types"
import { MessageBubble, Button, Badge } from "@/components/ui"
import { ChatInput } from "./chat-input"
import { sendMessage } from "@/lib/chat-api"
import { fetchSuggestions, markSuggestionUsed } from "@/lib/suggestions-api"
import { ArrowLeft } from "lucide-react"

type ChatInterfaceProps = {
    session: SessionResponse
    sceneName: string
    onBack: () => void
}

export function ChatInterface({ session, sceneName, onBack }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isSending, setIsSending] = useState(false)
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
    const [tension, setTension] = useState(session.tension)
    const [nextActor, setNextActor] = useState(session.next_actor)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Build 3 manual suggestions from character/scene info on first load
    useEffect(() => {
        const character = Object.values(session.characters)[0]
        const characterName = character?.name ?? "them"
        const manualSuggestions: Suggestion[] = [
            { id: "manual-1", text: `${characterName}! There is earthquake, come hide below table` },
            { id: "manual-2", text: "I'm new employee here, can you help me to find the bathroom?" },
            { id: "manual-3", text: "I had fight with my wife today, I don't know how to make her happy" },
        ]
        setSuggestions(manualSuggestions)
    }, [session])

    const loadSingleSuggestion = useCallback(async () => {
        setIsSuggestionsLoading(true)
        setSuggestions([])
        try {
            const res = await fetchSuggestions(session.session_id, 1)
            setSuggestions(res.suggestions)
        } catch (err) {
            console.error("[Suggestions] Failed to load suggestion:", err)
            // silently fail — no suggestion shown
        } finally {
            setIsSuggestionsLoading(false)
        }
    }, [session.session_id])

    const handleSendMessage = async (messageText: string) => {
        // Clear suggestions while waiting for AI reply
        setSuggestions([])

        // Add user message
        const userMessage: ChatMessage = {
            speaker: "user",
            message: messageText,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setIsSending(true)

        try {
            console.log("Sending message to API:", messageText)
            console.log("Session ID:", session.session_id)

            // Send to API
            const response = await sendMessage(session.session_id, messageText)

            console.log("Received response:", response)

            // Add AI response messages
            const newAiMessages = response.messages.map((msg) => ({
                speaker: msg.speaker,
                message: msg.message,
                timestamp: new Date(),
            }))
            
            setMessages((prev) => [...prev, ...newAiMessages])

            // Update tension and next actor from the response
            setTension(response.tension)
            setNextActor(response.next_actor)

            // After AI reply, fetch exactly 1 LLM suggestion
            loadSingleSuggestion()
        } catch (error) {
            // Add error message
            const errorMessage: ChatMessage = {
                speaker: "system",
                message: error instanceof Error ? error.message : "Sorry, there was an error processing your message. Please try again.",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsSending(false)
        }
    }

    const handleSuggestionSelect = async (_text: string, id: string) => {
        // Only mark DB suggestions as used (manual ones have "manual-" prefix)
        if (!id.startsWith("manual-")) {
            try {
                await markSuggestionUsed(id)
            } catch {
                // ignore
            }
        }
        // Clear suggestions so the user focuses on the pre-filled input
        setSuggestions([])
    }

    const getAvatarDetails = (speaker: string) => {
        if (speaker === "user") {
            return {
                avatarUrl: undefined,
                name: "You"
            }
        }

        if (speaker === "narrator") {
            return {
                avatarUrl: undefined,
                name: "Narrator"
            }
        }

        if (speaker === "system") {
            return {
                avatarUrl: undefined, // Could add a system icon later
                name: "System"
            }
        }

        // Check if it's a character (might come as "Character Name" or just "Name")
        // The API returns speaker as just the name for characters
        const character = Object.values(session.characters).find(
            c => c.name.toLowerCase() === speaker.toLowerCase()
        )

        return {
            avatarUrl: character?.image || undefined,
            name: character?.name || speaker
        }
    }



    return (
        <div className="flex flex-col w-full items-center h-screen bg-white">
            {/* Header */}
            <div className="w-full max-w-4/5 mx-auto h-full flex flex-col pt-4 pb-4">
                <div className="relative flex items-center justify-center py-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="absolute left-0 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div className="text-center">
                        <h1 className="text-lg font-semibold text-black">
                            {sceneName}
                        </h1>
                        <p className="text-xs text-black/60">
                            Tension: {tension} • Next: {nextActor}
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-6 pb-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                Start a conversation by typing a message below
                            </p>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const { avatarUrl, name } = getAvatarDetails(msg.speaker)
                            return (
                                <MessageBubble
                                    key={index}
                                    message={msg}
                                    avatarUrl={avatarUrl}
                                    senderName={name}
                                />
                            )
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input + Suggestions */}
                <ChatInput
                    onSend={handleSendMessage}
                    disabled={isSending}
                    placeholder={isSending ? "Waiting for response..." : "Type your message..."}
                    suggestions={suggestions}
                    isSuggestionsLoading={isSuggestionsLoading}
                    onSuggestionSelect={handleSuggestionSelect}
                />
            </div>
        </div>
    )
}
