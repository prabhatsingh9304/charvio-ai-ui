"use client"

import { useEffect, useState } from "react"
import { listConversations, deleteConversation } from "@/services/conversations.service"
import type { ConversationResponse } from "@/types/types"
import { SidebarHeader } from "./chat-history-sidebar/sidebar-header"
import { NewChatButton } from "./chat-history-sidebar/new-chat-button"
import { ConversationItem } from "./chat-history-sidebar/conversation-item"
import { LoadingState } from "./chat-history-sidebar/loading-state"
import { EmptyState } from "./chat-history-sidebar/empty-state"

type ChatHistorySidebarProps = {
    isOpen: boolean
    onClose: () => void
    characterId: string
    activeConversationId?: string | null
    onSelectConversation: (conversationId: string) => void
    onNewChat: () => void
}

export function ChatHistorySidebar({
    isOpen,
    onClose,
    characterId,
    activeConversationId,
    onSelectConversation,
    onNewChat,
}: ChatHistorySidebarProps) {
    const [conversations, setConversations] = useState<ConversationResponse[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isOpen) return

        async function loadConversations() {
            setLoading(true)
            try {
                const res = await listConversations({ character_id: characterId })
                setConversations(res.conversations)
            } catch (err) {
                console.error("Failed to load conversations:", err)
            } finally {
                setLoading(false)
            }
        }

        loadConversations()
    }, [isOpen, characterId])

    const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        try {
            await deleteConversation(conversationId)
            setConversations((prev) => prev.filter((c) => c.id !== conversationId))
            if (activeConversationId === conversationId) {
                onNewChat()
            }
        } catch (err) {
            console.error("Failed to delete conversation:", err)
        }
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
                }`}
            >
                <div className="flex flex-col h-full">
                    <SidebarHeader onClose={onClose} />

                    <NewChatButton
                        onClick={() => {
                            onNewChat()
                            onClose()
                        }}
                    />

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <LoadingState />
                        ) : conversations.length === 0 ? (
                            <EmptyState />
                        ) : (
                            conversations.map((conv) => {
                                const isActive = conv.id === activeConversationId
                                return (
                                    <ConversationItem
                                        key={conv.id}
                                        conversation={conv}
                                        isActive={isActive}
                                        onSelect={() => {
                                            onSelectConversation(conv.id)
                                            onClose()
                                        }}
                                        onDelete={(e) => handleDeleteConversation(conv.id, e)}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
