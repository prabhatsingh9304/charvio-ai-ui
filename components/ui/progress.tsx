type ProgressProps = {
    value: number
    max?: number
    size?: "sm" | "md" | "lg"
    variant?: "default" | "gradient" | "success" | "warning" | "danger"
    showLabel?: boolean
    className?: string
}

export function Progress({
    value,
    max = 100,
    size = "md",
    variant = "default",
    showLabel = false,
    className = "",
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeStyles = {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-3.5",
    }

    const variantStyles = {
        default: "bg-pink-100 dark:bg-pink-900/30",
        gradient: "bg-gradient-to-r from-pink-500 to-rose-400",
        success: "bg-gradient-to-r from-emerald-500 to-green-600",
        warning: "bg-gradient-to-r from-amber-500 to-orange-600",
        danger: "bg-gradient-to-r from-rose-500 to-red-600",
    }

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Progress
                    </span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div
                className={`
                    w-full ${sizeStyles[size]} 
                    bg-zinc-200 dark:bg-zinc-800 
                    rounded-full overflow-hidden
                `}
            >
                <div
                    className={`
                        h-full ${variantStyles[variant]} 
                        rounded-full transition-all duration-500 ease-out
                        relative overflow-hidden
                    `}
                    style={{ width: `${percentage}%` }}
                >
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
            </div>
        </div>
    )
}
