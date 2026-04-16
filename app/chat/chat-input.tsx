"use client"

import { useState, KeyboardEvent } from "react"
import type { Suggestion } from "@/types/types"
import { SuggestionBubbles } from "./suggestion-bubbles"

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
    placeholder = "Type your message...",
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
        <div className="w-full pb-6 pt-2 z-20">
            {/* Suggestion bubbles */}
            <SuggestionBubbles
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                isLoading={isSuggestionsLoading}
            />

            <div className="bg-white/80 dark:bg-pink-950/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-800">
                <div className="flex gap-3 items-end">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={placeholder}
                        rows={1}
                        className="flex-1 resize-none rounded-xl border border-pink-100 dark:border-pink-800 bg-pink-50/50 dark:bg-pink-950/50 px-4 py-3 text-sm text-black dark:text-pink-100 placeholder:text-pink-400 dark:placeholder:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto"
                        style={{
                            height: 'auto',
                            minHeight: '44px',
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            target.style.height = 'auto'
                            target.style.height = target.scrollHeight + 'px'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={disabled || !message.trim()}
                        className="h-[46px] rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 font-medium text-white transition-all hover:from-pink-600 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-pink-500 disabled:hover:to-rose-400 flex items-center gap-2 shadow-sm whitespace-nowrap"
                    >
                        {disabled ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span className="hidden sm:inline">Sending...</span>
                            </>
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
