import type { ReactNode, ButtonHTMLAttributes } from "react"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantStyles = {
        primary: "bg-gradient-to-r from-red-600 to-rose-700 text-white hover:from-red-700 hover:to-rose-800 focus:ring-red-500 shadow-lg hover:shadow-xl backdrop-blur-sm",
        secondary: "bg-zinc-800/80 dark:bg-zinc-900/80 text-zinc-100 dark:text-zinc-50 hover:bg-zinc-700/80 dark:hover:bg-zinc-800/80 focus:ring-red-500 backdrop-blur-md border border-zinc-700/50",
        outline: "border-2 border-red-500/50 dark:border-red-600/50 text-red-700 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-600/10 focus:ring-red-500 backdrop-blur-sm",
        ghost: "text-zinc-300 dark:text-zinc-400 hover:bg-zinc-800/50 dark:hover:bg-zinc-900/50 focus:ring-red-500 backdrop-blur-sm",
        danger: "bg-gradient-to-r from-rose-600 to-pink-700 text-white hover:from-rose-700 hover:to-pink-800 focus:ring-rose-500 shadow-lg hover:shadow-xl backdrop-blur-sm",
    }

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    )
}
