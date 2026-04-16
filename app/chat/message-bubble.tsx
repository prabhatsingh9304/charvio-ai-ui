"use client"

import type { ChatMessage } from "@/types/types"
import ReactMarkdown from "react-markdown"
import { Avatar } from "@/components/ui"

type MessageBubbleProps = {
    message: ChatMessage
    avatarUrl?: string
    senderName?: string
}

export function MessageBubble({ message, avatarUrl, senderName }: MessageBubbleProps) {
    const isUser = message.speaker === "user"
    const isNarrator = message.speaker === "narrator"

    return (
        <div
            className={`flex w-full mb-4 animate-fade-in items-end gap-2 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            {!isUser && (
                <Avatar
                    src={avatarUrl}
                    name={senderName || message.speaker}
                    size="sm"
                    className="mb-1 shrink-0"
                />
            )}

            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white ml-auto"
                    : isNarrator
                        ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-pink-100 italic"
                        : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-pink-100"
                    }`}
            >
                {!isUser && (
                    <div className="text-xs font-semibold mb-1 opacity-70 capitalize flex items-center gap-2">
                        {senderName || message.speaker}
                    </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap markdown-content">
                    <ReactMarkdown
                        components={{
                            strong: ({ node, ...props }) => <span className="font-bold text-pink-600 dark:text-pink-400" {...props} />
                        }}
                    >
                        {message.message}
                    </ReactMarkdown>
                </div>
                <div className={`text-xs mt-1 opacity-60 ${isUser ? "text-right" : ""}`}>
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>

            {isUser && (
                <Avatar
                    src={avatarUrl}
                    name="You"
                    size="sm"
                    className="mb-1 shrink-0"
                />
            )}
        </div>
    )
}
