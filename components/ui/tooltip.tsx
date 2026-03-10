"use client"

import { useState, type ReactNode } from "react"

type TooltipProps = {
    children: ReactNode
    content: string | ReactNode
    position?: "top" | "bottom" | "left" | "right"
    className?: string
}

export function Tooltip({
    children,
    content,
    position = "top",
    className = "",
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    const positionStyles = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    }

    const arrowStyles = {
        top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-zinc-900 dark:border-t-zinc-700",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-zinc-900 dark:border-b-zinc-700",
        left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-zinc-900 dark:border-l-zinc-700",
        right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-zinc-900 dark:border-r-zinc-700",
    }

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={`
                        absolute z-50 
                        ${positionStyles[position]}
                        animate-fade-in
                    `}
                >
                    <div className="relative px-3 py-2 bg-zinc-900 dark:bg-zinc-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                        {content}
                        <div
                            className={`
                                absolute w-0 h-0 
                                border-4 
                                ${arrowStyles[position]}
                            `}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
