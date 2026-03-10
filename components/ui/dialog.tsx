"use client"

import * as React from "react"
import { useEffect } from "react"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false)
        }

        if (open) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [open, onOpenChange])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => onOpenChange(false)}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            {children}
        </div>
    )
}

interface DialogContentProps {
    children: React.ReactNode
    className?: string
    size?: "sm" | "md" | "lg" | "xl"
}

export function DialogContent({
    children,
    className = "",
    size = "md"
}: DialogContentProps) {
    const sizeStyles = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    }

    return (
        <div
            className={`
                relative w-full ${sizeStyles[size]} 
                bg-white dark:bg-zinc-900 
                rounded-2xl shadow-2xl 
                max-h-[90vh] overflow-y-auto
                animate-scale-in
                ${className}
            `}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    )
}

interface DialogHeaderProps {
    children: React.ReactNode
    className?: string
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
    return (
        <div className={`p-6 border-b border-zinc-200 dark:border-zinc-800 ${className}`}>
            {children}
        </div>
    )
}

interface DialogTitleProps {
    children: React.ReactNode
    className?: string
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
    return (
        <h2 className={`text-xl font-semibold text-zinc-900 dark:text-zinc-50 ${className}`}>
            {children}
        </h2>
    )
}

interface DialogFooterProps {
    children: React.ReactNode
    className?: string
}

export function DialogFooter({ children, className = "" }: DialogFooterProps) {
    return (
        <div className={`p-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2 ${className}`}>
            {children}
        </div>
    )
}
