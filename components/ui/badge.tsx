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
        default: "bg-pink-50 text-gray-700 backdrop-blur-md border border-pink-200",
        primary: "bg-pink-100/50 text-pink-800 border border-pink-300/60 backdrop-blur-md",
        success: "bg-emerald-50 text-emerald-800 border border-emerald-200 backdrop-blur-md",
        warning: "bg-amber-50 text-amber-800 border border-amber-200 backdrop-blur-md",
        danger: "bg-rose-50 text-rose-800 border border-rose-200 backdrop-blur-md",
        info: "bg-sky-50 text-sky-800 border border-sky-200 backdrop-blur-md",
    }

    const sizeStyles = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
    }

    const dotColors = {
        default: "bg-gray-500",
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
