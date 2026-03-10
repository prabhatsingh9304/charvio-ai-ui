type AvatarProps = {
    src?: string
    alt?: string
    name?: string
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
    status?: "online" | "offline" | "away" | "busy"
}

export function Avatar({
    src,
    alt,
    name,
    size = "md",
    className = "",
    status,
}: AvatarProps) {
    const sizeStyles = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-xl",
    }

    const statusColors = {
        online: "bg-green-500",
        offline: "bg-zinc-400",
        away: "bg-yellow-500",
        busy: "bg-red-500",
    }

    const statusSizes = {
        sm: "w-2 h-2",
        md: "w-2.5 h-2.5",
        lg: "w-3 h-3",
        xl: "w-4 h-4",
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                className={`
                    ${sizeStyles[size]} 
                    rounded-full overflow-hidden 
                    bg-gradient-to-br from-red-600 to-rose-700 
                    flex items-center justify-center 
                    text-white font-semibold
                    ring-2 ring-zinc-800/50 dark:ring-black/50
                    transition-all duration-200
                    hover:ring-4 hover:ring-red-600/30 dark:hover:ring-red-500/30
                    backdrop-blur-sm
                `}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt || name || "Avatar"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>{name ? getInitials(name) : "?"}</span>
                )}
            </div>
            {status && (
                <span
                    className={`
                        absolute bottom-0 right-0 
                        ${statusSizes[size]} 
                        ${statusColors[status]} 
                        rounded-full 
                        ring-2 ring-white dark:ring-zinc-900
                        ${status === "online" ? "animate-pulse" : ""}
                    `}
                />
            )}
        </div>
    )
}
