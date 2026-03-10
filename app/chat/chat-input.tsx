"use client"

import { useState, KeyboardEvent } from "react"

type ChatInputProps = {
    onSend: (message: string) => void
    disabled?: boolean
    placeholder?: string
}

export function ChatInput({ onSend, disabled = false, placeholder = "Type your message..." }: ChatInputProps) {
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

    return (
        <div className="w-full pb-6 pt-2 z-20">
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-3 items-end">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={placeholder}
                        rows={1}
                        className="flex-1 resize-none rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto"
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
                        className="h-[46px] rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 font-medium text-white transition-all hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-purple-600 flex items-center gap-2 shadow-sm whitespace-nowrap"
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
