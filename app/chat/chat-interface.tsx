"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { ChatMessage, SessionResponse, Suggestion } from "@/types/types"
import { MessageBubble, Avatar } from "@/components/ui"
import { ChatInput } from "./chat-input"
import { sendMessage } from "@/lib/chat-api"
import { fetchSuggestions, markSuggestionUsed } from "@/lib/suggestions-api"
import { ArrowLeft } from "lucide-react"

type ChatInterfaceProps = {
    session: SessionResponse
    onBack: () => void
}

export function ChatInterface({ session, onBack }: ChatInterfaceProps) {
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
            const res = await fetchSuggestions(session.session_id, 3)
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

            // Send to API
            const response = await sendMessage(session.session_id, messageText)

            // Normalize response: API returns either a `messages` array or a single `speaker`/`message`
            const responseMessages = response.messages
                ?? (response.speaker && response.message
                    ? [{ speaker: response.speaker, message: response.message }]
                    : [])
            const newAiMessages = responseMessages.map((msg) => ({
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



    const characterNames = Object.values(session.characters)
        .map((c) => c.name)
        .join(", ")

    const firstCharacter = Object.values(session.characters)[0]

    return (
        <div className="flex flex-col w-full h-screen bg-[#efeae2]">
            {/* WhatsApp-style Header */}
            <div className="bg-[#075E54] text-white px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 shadow-md z-30 shrink-0">
                <button
                    onClick={onBack}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="relative">
                    <Avatar
                        src={firstCharacter?.image || undefined}
                        name={firstCharacter?.name ?? "Character"}
                        size="md"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="text-base font-medium truncate leading-tight">
                        {firstCharacter?.name ?? "Character"}
                    </h1>
                    <p className="text-xs text-white/70 truncate">
                        {isSending ? "typing..." : "online"}
                    </p>
                </div>

                {/* <div className="hidden sm:flex items-center gap-2 text-xs text-white/60 bg-white/10 rounded-full px-3 py-1">
                    <span>Tension: {tension}</span>
                    <span className="text-white/30">•</span>
                    <span>Next: {nextActor}</span>
                </div> */}
            </div>

            {/* Chat wallpaper area */}
            <div className="flex-1 overflow-y-auto whatsapp-wallpaper px-3 sm:px-16 py-2 sm:py-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white/80 text-[#54656f] text-sm px-4 py-2 rounded-lg shadow-sm text-center">
                            Start the conversation by sending a message
                        </div>
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
            <div className="bg-[#f0f2f5] border-t border-[#d1d7db] px-2 sm:px-12 shrink-0">
                <ChatInput
                    onSend={handleSendMessage}
                    disabled={isSending}
                    placeholder={isSending ? "Waiting for response..." : "Type a message"}
                    suggestions={suggestions}
                    isSuggestionsLoading={isSuggestionsLoading}
                    onSuggestionSelect={handleSuggestionSelect}
                />
            </div>
        </div>
    )
}
