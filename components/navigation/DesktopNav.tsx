"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui"
import { CreateDropdown } from "./CreateDropdown"

interface DesktopNavProps {
    onOpenCharacter: () => void
    onOpenScene: () => void
}

export function DesktopNav({ onOpenCharacter, onOpenScene }: DesktopNavProps) {
    const pathname = usePathname()
    const router = useRouter()

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Scenes", path: "/scenes" },
        { label: "Characters", path: "/characters" },
    ]

    return (
        <div className="hidden md:flex items-center gap-2">
            <CreateDropdown onOpenCharacter={onOpenCharacter} onOpenScene={onOpenScene} />

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
    )
}
