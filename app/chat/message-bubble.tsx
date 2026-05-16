"use client"

import type { ChatMessage } from "@/types/types"
import ReactMarkdown from "react-markdown"
import { Avatar } from "@/components/ui"
import { Check, CheckCheck } from "lucide-react"

type MessageBubbleProps = {
    message: ChatMessage
    avatarUrl?: string
    senderName?: string
}

export function MessageBubble({ message, avatarUrl, senderName }: MessageBubbleProps) {
    const isUser = message.speaker === "user"
    const isNarrator = message.speaker === "narrator"
    const isSystem = message.speaker === "system"
    const timeString = message.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })

    if (isSystem) {
        return (
            <div className="flex justify-center my-2 animate-fade-in">
                <div className="bg-[#e2d6c1]/80 text-[#54656f] text-xs px-3 py-1 rounded-lg shadow-sm max-w-[85%] text-center">
                    {message.message}
                </div>
            </div>
        )
    }

    if (isNarrator) {
        return (
            <div className="flex justify-center my-3 animate-fade-in">
                <div className="bg-[#d9fdd3]/60 text-[#374045] text-sm italic px-4 py-2 rounded-lg shadow-sm max-w-[85%] text-center border border-[#d1f4cc]">
                    <div className="text-xs font-semibold text-[#128C7E] mb-1">Narrator</div>
                    <ReactMarkdown>{message.message}</ReactMarkdown>
                    <div className="text-[10px] text-[#667781] mt-1">{timeString}</div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`flex w-full mb-1 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}
        >
            {!isUser && (
                <Avatar
                    src={avatarUrl}
                    name={senderName || message.speaker}
                    size="sm"
                    className="mt-auto mb-0.5 mr-1.5 shrink-0"
                />
            )}

            <div className={`relative max-w-[75%] sm:max-w-[65%] ${isUser ? "mr-1" : "ml-1"}`}>
                {/* Bubble tail */}
                {isUser ? (
                    <div className="absolute -right-1.5 top-0 w-3 h-3 overflow-hidden">
                        <div className="w-4 h-4 bg-[#d9fdd3] rotate-45 transform origin-bottom-left" />
                    </div>
                ) : (
                    <div className="absolute -left-1.5 top-0 w-3 h-3 overflow-hidden">
                        <div className="w-4 h-4 bg-white rotate-45 transform origin-bottom-right" />
                    </div>
                )}

                <div
                    className={`rounded-lg px-2.5 py-1.5 shadow-sm ${
                        isUser
                            ? "bg-[#d9fdd3] text-[#111b21] rounded-tr-none"
                            : "bg-white text-[#111b21] rounded-tl-none"
                    }`}
                >
                    {!isUser && (
                        <div className="text-[13px] font-semibold mb-0.5 text-[#128C7E] capitalize">
                            {senderName || message.speaker}
                        </div>
                    )}
                    <div className="text-[14.2px] leading-[19px] whitespace-pre-wrap markdown-content">
                        <ReactMarkdown
                            components={{
                                strong: ({ node, ...props }) => (
                                    <span className="font-bold" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="mb-0 inline" {...props} />
                                ),
                            }}
                        >
                            {message.message}
                        </ReactMarkdown>
                        {/* Invisible spacer to prevent text overlapping timestamp */}
                        <span className="inline-block w-[70px]" />
                    </div>

                    {/* Timestamp + read receipt (WhatsApp-style bottom-right) */}
                    <div className="float-right -mt-4 ml-2 flex items-center gap-0.5">
                        <span className="text-[11px] text-[#667781] leading-none">
                            {timeString}
                        </span>
                        {isUser && (
                            <CheckCheck className="w-[16px] h-[16px] text-[#53bdeb] ml-0.5" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
