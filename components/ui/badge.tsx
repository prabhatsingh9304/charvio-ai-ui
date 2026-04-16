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
        primary: "bg-pink-100/30 dark:bg-pink-900/40 text-black dark:text-pink-100 border border-pink-200/50 dark:border-pink-800/50 backdrop-blur-md",
        success: "bg-emerald-100/30 dark:bg-emerald-900/40 text-black dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-md",
        warning: "bg-amber-100/30 dark:bg-amber-900/40 text-black dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-md",
        danger: "bg-rose-100/30 dark:bg-rose-900/40 text-black dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/50 backdrop-blur-md",
        info: "bg-gradient-to-r from-cyan-600/20 to-blue-700/20 text-cyan-200 dark:text-cyan-300 border border-cyan-500/30 dark:border-cyan-600/30 backdrop-blur-md",
    }

    const sizeStyles = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
    }

    const dotColors = {
        default: "bg-zinc-400 dark:bg-zinc-500",
        primary: "bg-pink-500",
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        danger: "bg-rose-500",
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
