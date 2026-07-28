"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { ChatMessage, SessionResponse } from "@/types/types"
import { ChatInput } from "./chat-input"
import { sendMessage } from "@/services/chat.service"
import { createSession } from "@/services/session.service"
import { ChatHistorySidebar } from "./chat-history-sidebar"
import { getConversation } from "@/services/conversations.service"
import { ChatHeader } from "./chat-interface/chat-header"
import { EmptyChatState } from "./chat-interface/empty-chat-state"
import { ChatMessagesList } from "./chat-interface/chat-messages-list"

type ChatInterfaceProps = {
    session: SessionResponse
    onBack: () => void
    onNewChat: () => void
}

export function ChatInterface({ session, onBack, onNewChat }: ChatInterfaceProps) {
    const router = useRouter()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isSending, setIsSending] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const characterId = Object.keys(session.characters)[0]

    const handleSelectConversation = async (conversationId: string) => {
        if (conversationId === session.conversation_id) return
        try {
            const newSession = await createSession(characterId, session.scene_id ?? undefined, conversationId)
            router.push(`/chat?session=${newSession.session_id}`)
        } catch (err) {
            console.error("Failed to switch conversation:", err)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        async function loadPreviousMessages() {
            if (!session.conversation_id) return
            try {
                const detail = await getConversation(session.conversation_id)
                if (detail.messages.length > 0) {
                    const loaded: ChatMessage[] = detail.messages.map((m) => ({
                        speaker: m.role,
                        message: m.content,
                        timestamp: new Date(m.created_at),
                    }))
                    setMessages(loaded)
                }
            } catch (err) {
                console.error("Failed to load previous messages:", err)
            }
        }

        loadPreviousMessages()
    }, [session])

    const handleSendMessage = async (messageText: string) => {
        const userMessage: ChatMessage = {
            speaker: "user",
            message: messageText,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setIsSending(true)

        try {
            const response = await sendMessage(session.session_id, messageText)

            const newAiMessages = response.messages.map((msg) => ({
                speaker: msg.speaker,
                message: msg.message,
                timestamp: new Date(),
            }))

            setMessages((prev) => [...prev, ...newAiMessages])
        } catch (error) {
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

    return (
        <div className="flex flex-col w-full h-screen bg-[#efeae2]">
            <ChatHeader
                session={session}
                isSending={isSending}
                onBack={onBack}
                onMenuClick={() => setSidebarOpen(true)}
            />

            <ChatHistorySidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                characterId={characterId}
                activeConversationId={session.conversation_id}
                onSelectConversation={handleSelectConversation}
                onNewChat={onNewChat}
            />

            {/* Chat wallpaper area */}
            <div className="flex-1 overflow-y-auto whatsapp-wallpaper px-3 sm:px-16 py-2 sm:py-4">
                {messages.length === 0 ? (
                    <EmptyChatState />
                ) : (
                    <ChatMessagesList messages={messages} session={session} />
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input + Suggestions */}
            <div className="bg-[#f0f2f5] border-t border-[#d1d7db] px-2 sm:px-12 shrink-0">
                <ChatInput
                    onSend={handleSendMessage}
                    disabled={isSending}
                    placeholder={isSending ? "Waiting for response..." : "Type a message"}
                />
            </div>
        </div>
    )
}
