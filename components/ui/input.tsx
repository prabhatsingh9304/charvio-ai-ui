import type { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
    helperText?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

export function Input({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = "",
    id,
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                        {leftIcon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`
                        w-full rounded-xl border bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error
                            ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                            : "border-zinc-300 dark:border-zinc-700"
                        }
                        ${leftIcon ? "pl-10" : ""}
                        ${rightIcon ? "pr-10" : ""}
                        ${className}
                    `}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {helperText}
                </p>
            )}
        </div>
    )
}
