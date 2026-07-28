"use client"

import { SectionHeader } from "@/components/common/section-header"

interface ExploreHeaderProps {
    hideHeader?: boolean;
}

export function ExploreHeader({ hideHeader = false }: ExploreHeaderProps) {
    return (
        <SectionHeader
            title="Explore Scenes"
            description="Choose a setting for your conversation"
            viewAllPath="/scenes"
            hideHeader={hideHeader}
        />
    );
}
