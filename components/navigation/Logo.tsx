"use client"

import { useRouter } from "next/navigation"

interface LogoProps {
    onNavigate?: (path: string) => void
}

export function Logo({ onNavigate }: LogoProps) {
    const router = useRouter()

    const handleClick = () => {
        const path = "/"
        if (onNavigate) {
            onNavigate(path)
        } else {
            router.push(path)
        }
    }

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 group p-2 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-2xl hover:border-pink-500/50 hover:bg-pink-50/50 border border-transparent"
        >
            <div className="text-2xl">🏙️</div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-pink-600 transition-all duration-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.3)]">
                Sim City
            </span>
        </button>
    )
}
