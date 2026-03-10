"use client"

import { useEffect, useRef, useState } from "react"
import type { ChatMessage, SessionResponse } from "@/types/types"
import { MessageBubble, Button, Badge } from "@/components/ui"
import { ChatInput } from "./chat-input"
import { sendMessage } from "@/lib/chat-api"
import { ArrowLeft } from "lucide-react"

type ChatInterfaceProps = {
    session: SessionResponse
    sceneName: string
    onBack: () => void
}

export function ChatInterface({ session, sceneName, onBack }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (messageText: string) => {
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

            // Add AI response
            const aiMessage: ChatMessage = {
                speaker: response.speaker,
                message: response.message,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMessage])
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
        <div className="flex flex-col w-full items-center h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
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
                        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            {sceneName}
                        </h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Tension: {session.tension} • Next: {session.next_actor}
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

                {/* Input */}
                <ChatInput
                    onSend={handleSendMessage}
                    disabled={isSending}
                    placeholder={isSending ? "Waiting for response..." : "Type your message..."}
                />
            </div>
        </div>
    )
}
