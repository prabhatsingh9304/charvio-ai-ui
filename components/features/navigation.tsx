"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui"
import { CreateCharacterDialog } from "./create-character-dialog"
import { CreateSceneDialog } from "./create-scene-dialog"

export function Navigation() {
    const pathname = usePathname()
    const router = useRouter()
    const [isCharacterOpen, setIsCharacterOpen] = useState(false)
    const [isSceneOpen, setIsSceneOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    if (pathname?.startsWith("/chat")) {
        return null
    }

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Scenes", path: "/scenes" },
        { label: "Characters", path: "/characters" },
    ]

    const handleNavClick = (path: string) => {
        router.push(path)
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <nav className="sticky top-0 z-40 w-full border-b border-pink-200/50 bg-white/80 backdrop-blur-lg transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button
                            onClick={() => handleNavClick("/")}
                            className="flex items-center gap-2 group p-2 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-2xl hover:border-pink-500/50 hover:bg-pink-50/50 border border-transparent"
                        >
                            <div className="text-2xl">🏙️</div>
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-pink-600 transition-all duration-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.3)]">
                                Sim City
                            </span>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            {/* Create Dropdown */}
                            <div className="relative group">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="relative flex items-center gap-1 overflow-hidden transition-all duration-300 border border-transparent cursor-pointer hover:shadow-2xl hover:border-pink-500/50 hover:bg-pink-50/50"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <span className="relative z-10 flex items-center gap-1 font-semibold">
                                        <span>✨ Create</span>
                                        <svg className="w-4 h-4 text-gray-700 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </Button>

                                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-1 bg-white/95 backdrop-blur-xl border border-pink-200/50 rounded-xl shadow-xl">
                                        <button
                                            onClick={() => setIsCharacterOpen(true)}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-pink-700 hover:bg-pink-50 transition-colors flex items-center gap-2"
                                        >
                                            <span>👤</span>
                                            New Character
                                        </button>
                                        <button
                                            onClick={() => setIsSceneOpen(true)}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-pink-700 hover:bg-pink-50 transition-colors flex items-center gap-2"
                                        >
                                            <span>🎬</span>
                                            New Scene
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-px h-6 bg-pink-200 mx-2" />
                            {navItems.map((item) => {
                                const isActive = pathname === item.path
                                return (
                                    <Button
                                        key={item.path}
                                        variant={isActive ? "primary" : "ghost"}
                                        size="sm"
                                        onClick={() => router.push(item.path)}
                                        className={isActive ? "" : "cursor-pointer hover:shadow-2xl hover:border-pink-500/50 hover:bg-pink-50/50 border border-transparent"}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                        <span className="relative z-10">{item.label}</span>
                                    </Button>
                                )
                            })}
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div ref={mobileMenuRef} className="md:hidden border-t border-pink-200/50 bg-white/95 backdrop-blur-lg animate-fade-in z-50">
                        <div className="container mx-auto px-4 py-3 space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.path
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => handleNavClick(item.path)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                            isActive
                                                ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white"
                                                : "text-gray-700 hover:bg-pink-50"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                )
                            })}
                            <div className="h-px bg-pink-200 my-2" />
                            <button
                                onClick={() => { setIsCharacterOpen(true); setIsMobileMenuOpen(false) }}
                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-50 transition-all flex items-center gap-2"
                            >
                                <span>👤</span> New Character
                            </button>
                            <button
                                onClick={() => { setIsSceneOpen(true); setIsMobileMenuOpen(false) }}
                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-50 transition-all flex items-center gap-2"
                            >
                                <span>🎬</span> New Scene
                            </button>
                        </div>
                    </div>
                )}
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
