import type { KeyboardEvent } from "react"
import { Textarea } from "@/components/ui/textarea"

type MessageTextareaProps = {
    value: string
    onChange: (value: string) => void
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    disabled?: boolean
    placeholder?: string
}

export function MessageTextarea({
    value,
    onChange,
    onKeyDown,
    disabled = false,
    placeholder = "Type a message",
}: MessageTextareaProps) {
    return (
        <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className="flex-1 resize-none bg-transparent py-2.5 px-1 text-[15px] text-[#111b21] placeholder:text-[#667781] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-[120px] overflow-y-auto border-0 rounded-none shadow-none"
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
    )
}
