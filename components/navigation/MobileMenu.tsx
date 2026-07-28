"use client"

import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"

interface MobileMenuProps {
    isOpen: boolean
    onNavigate: (path: string) => void
    onOpenCharacter: () => void
    onOpenScene: () => void
}

export function MobileMenu({ isOpen, onNavigate, onOpenCharacter, onOpenScene }: MobileMenuProps) {
    const pathname = usePathname()

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Scenes", path: "/scenes" },
        { label: "Characters", path: "/characters" },
    ]

    if (!isOpen) return null

    return (
        <Card className="md:hidden border-t border-pink-200/50 bg-white/95 backdrop-blur-lg animate-fade-in z-50 rounded-none">
            <div className="container mx-auto px-4 py-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                        <button
                            key={item.path}
                            onClick={() => onNavigate(item.path)}
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
                    onClick={onOpenCharacter}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-50 transition-all flex items-center gap-2"
                >
                    <span>👤</span> New Character
                </button>
                <button
                    onClick={onOpenScene}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-50 transition-all flex items-center gap-2"
                >
                    <span>🎬</span> New Scene
                </button>
            </div>
        </Card>
    )
}
