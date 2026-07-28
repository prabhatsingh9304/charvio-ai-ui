"use client"

import { ReactNode } from "react"
import { Card } from "@/components/ui"

interface BaseCardProps {
    children: ReactNode
    selected?: boolean
    onClick?: () => void
    className?: string
}

export function BaseCard({ children, selected = false, onClick, className = "" }: BaseCardProps) {
    return (
        <Card
            className={`
                w-full flex-shrink-0 group transition-all duration-300 !border-pink-200 !shadow-[0_0_15px_rgba(244,114,182,0.2)] !bg-white/80 hover:!border-pink-300 hover:!shadow-[0_0_25px_rgba(244,114,182,0.3)]
                ${selected ? "!ring-2 !ring-pink-500 !shadow-pink-500/50 scale-[1.02]" : ""}
                ${className}
            `}
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-xl h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {children}
            </div>
        </Card>
    )
}
