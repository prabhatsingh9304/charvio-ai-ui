import type { TextareaHTMLAttributes } from "react"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    error?: string
    helperText?: string
}

export function Textarea({
    label,
    error,
    helperText,
    className = "",
    id,
    ...props
}: TextareaProps) {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-gray-800 mb-2"
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`
                    w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error
                        ? "border-rose-400 focus:ring-rose-500"
                        : "border-pink-300"
                    }
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-xs text-gray-500">
                    {helperText}
                </p>
            )}
        </div>
    )
}
