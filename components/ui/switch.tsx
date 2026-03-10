"use client"

import { useState, type ChangeEvent } from "react"

type SwitchProps = {
    checked?: boolean
    onChange?: (checked: boolean) => void
    label?: string
    disabled?: boolean
    size?: "sm" | "md" | "lg"
    className?: string
}

export function Switch({
    checked: controlledChecked,
    onChange,
    label,
    disabled = false,
    size = "md",
    className = "",
}: SwitchProps) {
    const [internalChecked, setInternalChecked] = useState(false)
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : internalChecked

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked
        if (!isControlled) {
            setInternalChecked(newChecked)
        }
        onChange?.(newChecked)
    }

    const sizeStyles = {
        sm: {
            container: "w-8 h-4",
            thumb: "w-3 h-3",
            translate: "translate-x-4",
        },
        md: {
            container: "w-11 h-6",
            thumb: "w-5 h-5",
            translate: "translate-x-5",
        },
        lg: {
            container: "w-14 h-7",
            thumb: "w-6 h-6",
            translate: "translate-x-7",
        },
    }

    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    className="sr-only peer"
                />
                <div
                    className={`
                        ${sizeStyles[size].container}
                        rounded-full
                        transition-all duration-200
                        ${checked
                            ? "bg-gradient-to-r from-red-600 to-rose-700"
                            : "bg-zinc-700 dark:bg-zinc-800"
                        }
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                />
                <div
                    className={`
                        absolute top-0.5 left-0.5
                        ${sizeStyles[size].thumb}
                        bg-white rounded-full
                        transition-transform duration-200
                        shadow-md
                        ${checked ? sizeStyles[size].translate : "translate-x-0"}
                    `}
                />
            </div>
            {label && (
                <span
                    className={`
                        text-sm font-medium text-zinc-700 dark:text-zinc-300
                        ${disabled ? "opacity-50" : ""}
                    `}
                >
                    {label}
                </span>
            )}
        </label>
    )
}
