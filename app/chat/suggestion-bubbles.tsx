"use client"

import type { Suggestion } from "@/types/types"

type SuggestionBubblesProps = {
    suggestions: Suggestion[]
    onSelect: (text: string, id: string) => void
    isLoading: boolean
}

export function SuggestionBubbles({ suggestions, onSelect, isLoading }: SuggestionBubblesProps) {
    if (!isLoading && suggestions.length === 0) return null

    return (
        <div className="w-full pb-1.5">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {isLoading ? (
                    <>
                        {[110].map((w, i) => (
                            <div
                                key={i}
                                className="h-8 rounded-full bg-[#d9fdd3] animate-pulse shrink-0"
                                style={{ width: `${w}px` }}
                            />
                        ))}
                    </>
                ) : (
                    suggestions.map((suggestion) => (
                        <button
                            key={suggestion.id}
                            onClick={() => onSelect(suggestion.text, suggestion.id)}
                            className="
                                shrink-0
                                px-3.5 py-1.5
                                text-[13px]
                                rounded-full
                                border border-[#00a884]/30
                                bg-white
                                text-[#111b21]
                                hover:bg-[#d9fdd3]/50
                                hover:border-[#00a884]/50
                                active:scale-95
                                transition-all duration-150 ease-out
                                whitespace-nowrap
                                cursor-pointer
                                shadow-sm
                            "
                        >
                            {suggestion.text}
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}
