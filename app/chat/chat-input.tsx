"use client"

import { useState, KeyboardEvent } from "react"
import type { Suggestion } from "@/types/types"
import { SuggestionBubbles } from "./suggestion-bubbles"
import { Send, Smile, Loader2 } from "lucide-react"

type ChatInputProps = {
    onSend: (message: string) => void
    disabled?: boolean
    placeholder?: string
    suggestions?: Suggestion[]
    isSuggestionsLoading?: boolean
    onSuggestionSelect?: (text: string, id: string) => void
}

export function ChatInput({
    onSend,
    disabled = false,
    placeholder = "Type a message",
    suggestions = [],
    isSuggestionsLoading = false,
    onSuggestionSelect,
}: ChatInputProps) {
    const [message, setMessage] = useState("")

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim())
            setMessage("")
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleSuggestionSelect = (text: string, id: string) => {
        setMessage(text)
        onSuggestionSelect?.(text, id)
    }

    return (
        <div className="w-full py-1.5 sm:py-2 z-20">
            {/* <SuggestionBubbles
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                isLoading={isSuggestionsLoading}
            /> */}

            <div className="flex items-end gap-2">
                <div className="flex-1 flex items-end bg-white rounded-[25px] px-2 shadow-sm">
                    <button className="p-2 text-[#54656f] hover:text-[#3b4a54] transition-colors shrink-0 cursor-pointer">
                        <Smile className="w-6 h-6" />
                    </button>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={placeholder}
                        rows={1}
                        className="flex-1 resize-none bg-transparent py-2.5 px-1 text-[15px] text-[#111b21] placeholder:text-[#667781] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-[120px] overflow-y-auto"
                        style={{
                            height: "auto",
                            minHeight: "40px",
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            target.style.height = "auto"
                            target.style.height = Math.min(target.scrollHeight, 120) + "px"
                        }}
                    />
                </div>

                <button
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    className="w-[48px] h-[48px] rounded-full bg-[#00a884] hover:bg-[#008f72] text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0 cursor-pointer"
                >
                    {disabled ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 ml-0.5" />
                    )}
                </button>
            </div>
        </div>
    )
}
