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
        primary: "bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:from-pink-600 hover:to-rose-500 focus:ring-pink-500 shadow-lg hover:shadow-xl backdrop-blur-sm",
        secondary: "bg-pink-100/80 dark:bg-pink-900/40 text-black dark:text-pink-100 hover:bg-pink-200/80 dark:hover:bg-pink-800/40 focus:ring-pink-500 backdrop-blur-md border border-pink-200/50 dark:border-pink-800/50",
        outline: "border-2 border-pink-500/50 dark:border-pink-600/50 text-black dark:text-pink-100 hover:bg-pink-500/10 dark:hover:bg-pink-600/10 focus:ring-pink-500 backdrop-blur-sm",
        ghost: "text-black dark:text-pink-100 hover:bg-pink-500/10 dark:hover:bg-pink-600/10 focus:ring-pink-500 backdrop-blur-sm",
        danger: "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 focus:ring-rose-500 shadow-lg hover:shadow-xl backdrop-blur-sm",
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
