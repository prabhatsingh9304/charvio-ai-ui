import type { ReactNode } from "react"

type CardProps = {
    children: ReactNode
    className?: string
    onClick?: () => void
}

export function Card({ children, className = "", onClick }: CardProps) {
    const baseStyles = "rounded-xl border border-zinc-800/50 bg-zinc-900/40 dark:bg-black/40 backdrop-blur-md shadow-lg transition-all duration-300"
    const interactiveStyles = onClick ? "cursor-pointer hover:shadow-2xl hover:border-red-600/50 dark:hover:border-red-500/50 hover:bg-zinc-900/60" : ""

    return (
        <div
            className={`${baseStyles} ${interactiveStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

type CardHeaderProps = {
    children: ReactNode
    className?: string
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
    return (
        <div className={`p-6 pb-4 ${className}`}>
            {children}
        </div>
    )
}

type CardTitleProps = {
    children: ReactNode
    className?: string
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
    return (
        <h3 className={`text-xl font-semibold text-zinc-100 ${className}`}>
            {children}
        </h3>
    )
}

type CardContentProps = {
    children: ReactNode
    className?: string
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    )
}
