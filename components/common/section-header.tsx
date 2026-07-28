"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui"

interface SectionHeaderProps {
    title: string
    description: string
    viewAllPath: string
    hideHeader?: boolean
}

export function SectionHeader({ title, description, viewAllPath, hideHeader = false }: SectionHeaderProps) {
    const router = useRouter()

    if (hideHeader) return null

    return (
        <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                    {description}
                </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => router.push(viewAllPath)}>
                View All →
            </Button>
        </div>
    )
}
