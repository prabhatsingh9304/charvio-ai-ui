"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui"
import { CreateCharacterDialog } from "./create-character-dialog"
import { CreateSceneDialog } from "./create-scene-dialog"

export function Navigation() {
    const pathname = usePathname()
    const router = useRouter()
    const [isCharacterOpen, setIsCharacterOpen] = useState(false)
    const [isSceneOpen, setIsSceneOpen] = useState(false)

    // Hide navbar on chat page
    if (pathname?.startsWith("/chat")) {
        return null
    }

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Scenes", path: "/scenes" },
        { label: "Characters", path: "/characters" },
    ]

    return (
        <>
            <nav className="sticky top-0 z-40 w-full border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 group"
                        >
                            <div className="text-2xl">🏙️</div>
                            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent group-hover:from-rose-600 group-hover:to-red-800 transition-all duration-300 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                Sim City
                            </span>
                        </button>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-2">
                            {/* Create Dropdown */}
                            <div className="relative group">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-1 group-hover:bg-zinc-800/50"
                                >
                                    <span>✨ Create</span>
                                    <svg className="w-4 h-4 text-zinc-400 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>

                                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-1 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-xl">
                                        <button
                                            onClick={() => setIsCharacterOpen(true)}
                                            className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                                        >
                                            <span>👤</span>
                                            New Character
                                        </button>
                                        <button
                                            onClick={() => setIsSceneOpen(true)}
                                            className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                                        >
                                            <span>🎬</span>
                                            New Scene
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-px h-6 bg-zinc-800 mx-2" />
                            {navItems.map((item) => {
                                const isActive = pathname === item.path
                                return (
                                    <Button
                                        key={item.path}
                                        variant={isActive ? "primary" : "ghost"}
                                        size="sm"
                                        onClick={() => router.push(item.path)}
                                    >
                                        {item.label}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            <CreateCharacterDialog
                isOpen={isCharacterOpen}
                onClose={() => setIsCharacterOpen(false)}
            />

            <CreateSceneDialog
                isOpen={isSceneOpen}
                onClose={() => setIsSceneOpen(false)}
            />
        </>
    )
}
