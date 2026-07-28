"use client"

import { Button } from "@/components/ui"
import { Card } from "@/components/ui/card"

interface CreateDropdownProps {
    onOpenCharacter: () => void
    onOpenScene: () => void
}

export function CreateDropdown({ onOpenCharacter, onOpenScene }: CreateDropdownProps) {
    return (
        <div className="relative group">
            <Button
                variant="ghost"
                size="sm"
                className="relative flex items-center gap-1 overflow-hidden transition-all duration-300 border border-transparent cursor-pointer hover:shadow-2xl hover:border-pink-500/50 hover:bg-pink-50/50"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10 flex items-center gap-1 font-semibold">
                    <span>Create</span>
                    <svg className="w-4 h-4 text-gray-700 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </Button>

            <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                <Card className="py-1">
                    <button
                        onClick={onOpenCharacter}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-pink-700 hover:bg-pink-50 transition-colors flex items-center gap-2"
                    >
                        <span>👤</span>
                        New Character
                    </button>
                    <button
                        onClick={onOpenScene}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-pink-700 hover:bg-pink-50 transition-colors flex items-center gap-2"
                    >
                        <span>🎬</span>
                        New Scene
                    </button>
                </Card>
            </div>
        </div>
    )
}
