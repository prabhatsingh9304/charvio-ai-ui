import type { ReactNode } from "react"

type CardProps = {
    children: ReactNode
    className?: string
    onClick?: () => void
}

export function Card({ children, className = "", onClick }: CardProps) {
    const baseStyles = "rounded-xl border border-pink-200/60 bg-white/60 backdrop-blur-md shadow-lg transition-all duration-300"
    const interactiveStyles = onClick ? "cursor-pointer hover:shadow-2xl hover:border-pink-400/50 hover:bg-pink-50/50" : ""

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
        <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
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
