"use client"

import { useState, KeyboardEvent } from "react"
import { EmojiButton } from "./chat-input/emoji-button"
import { MessageTextarea } from "./chat-input/message-textarea"
import { SendButton } from "./chat-input/send-button"

type ChatInputProps = {
    onSend: (message: string) => void
    disabled?: boolean
    placeholder?: string
}

export function ChatInput({
    onSend,
    disabled = false,
    placeholder = "Type a message",
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


    return (
        <div className="w-full py-1.5 sm:py-2 z-20">

            <div className="flex items-end gap-2">
                <div className="flex-1 flex items-end bg-white rounded-[25px] px-2 shadow-sm">
                    <EmojiButton />

                    <MessageTextarea
                        value={message}
                        onChange={setMessage}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                </div>

                <SendButton
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    isLoading={disabled}
                />
            </div>
        </div>
    )
}
