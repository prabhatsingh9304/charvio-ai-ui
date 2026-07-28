"use client"

import { useState, useRef, useEffect } from "react"
import { User } from "firebase/auth"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

interface ProfileMenuProps {
    user: User
    onSignOut: () => void
}

export function ProfileMenu({ user, onSignOut }: ProfileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const profileMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={profileMenuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
            >
                <Avatar
                    src={user.photoURL || undefined}
                    name={user.displayName || user.email || undefined}
                    size="md"
                    className="border-2 border-pink-200 hover:border-pink-400 transition-colors"
                />
            </button>

            {isOpen && (
                <Card className="absolute top-full right-0 mt-2 w-56 py-2 z-50">
                    <div className="px-4 py-2 border-b border-pink-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={onSignOut}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                    </button>
                </Card>
            )}
        </div>
    )
}
