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
        <div className="w-full px-1 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {isLoading ? (
                    // Skeleton loading pills
                    <>
                        {[110].map((w, i) => (
                            <div
                                key={i}
                                className="h-8 rounded-full bg-pink-100 dark:bg-pink-900 animate-pulse shrink-0"
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
                                px-4 py-1.5
                                text-sm font-medium
                                rounded-full
                                border border-pink-200 dark:border-pink-800
                                bg-pink-50/50 dark:bg-pink-950/50
                                text-black dark:text-pink-100
                                hover:bg-pink-100 dark:hover:bg-pink-900/60
                                hover:border-pink-400 dark:hover:border-pink-600
                                hover:shadow-sm
                                active:scale-95
                                transition-all duration-150 ease-out
                                whitespace-nowrap
                                cursor-pointer
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
