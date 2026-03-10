import type { ReactNode } from "react"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info"
type BadgeSize = "sm" | "md" | "lg"

type BadgeProps = {
    children: ReactNode
    variant?: BadgeVariant
    size?: BadgeSize
    className?: string
    dot?: boolean
}

export function Badge({
    children,
    variant = "default",
    size = "md",
    className = "",
    dot = false,
}: BadgeProps) {
    const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200"

    const variantStyles = {
        default: "bg-zinc-800/60 dark:bg-zinc-900/60 text-zinc-200 dark:text-zinc-300 backdrop-blur-md border border-zinc-700/50",
        primary: "bg-gradient-to-r from-red-600/20 to-rose-700/20 text-red-200 dark:text-red-300 border border-red-500/30 dark:border-red-600/30 backdrop-blur-md",
        success: "bg-gradient-to-r from-emerald-600/20 to-green-700/20 text-emerald-200 dark:text-emerald-300 border border-emerald-500/30 dark:border-emerald-600/30 backdrop-blur-md",
        warning: "bg-gradient-to-r from-amber-600/20 to-orange-700/20 text-amber-200 dark:text-amber-300 border border-amber-500/30 dark:border-amber-600/30 backdrop-blur-md",
        danger: "bg-gradient-to-r from-rose-600/20 to-pink-700/20 text-rose-200 dark:text-rose-300 border border-rose-500/30 dark:border-rose-600/30 backdrop-blur-md",
        info: "bg-gradient-to-r from-cyan-600/20 to-blue-700/20 text-cyan-200 dark:text-cyan-300 border border-cyan-500/30 dark:border-cyan-600/30 backdrop-blur-md",
    }

    const sizeStyles = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
    }

    const dotColors = {
        default: "bg-zinc-400 dark:bg-zinc-500",
        primary: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        danger: "bg-red-500",
        info: "bg-cyan-500",
    }

    return (
        <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
            {dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />
            )}
            {children}
        </span>
    )
}
