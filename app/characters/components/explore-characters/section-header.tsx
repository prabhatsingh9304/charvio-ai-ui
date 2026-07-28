"use client"

import { SectionHeader as SharedSectionHeader } from "@/components/common/section-header"

interface SectionHeaderProps {
    hideHeader?: boolean
}

export function SectionHeader({ hideHeader = false }: SectionHeaderProps) {
    return (
        <SharedSectionHeader
            title="Meet Characters"
            description="Start a conversation with any character"
            viewAllPath="/characters"
            hideHeader={hideHeader}
        />
    )
}
