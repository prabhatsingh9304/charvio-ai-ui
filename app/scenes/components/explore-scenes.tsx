"use client"

import type { Scene } from "@/types/types";
import { ExploreHeader } from "./explore-scenes/explore-header";
import { EmptyState } from "./explore-scenes/empty-state";
import { ScenesGrid } from "./explore-scenes/scenes-grid";
import { ScenesCarousel } from "./explore-scenes/scenes-carousel";

interface ExploreScenesProps {
    scenes: Scene[];
    selectedId?: string | null;
    onSelect?: (scene: Scene) => void;
    hideHeader?: boolean;
    variant?: 'grid' | 'carousel';
}

export function ExploreScenes({
    scenes,
    selectedId,
    onSelect,
    hideHeader = false,
    variant = 'grid'
}: ExploreScenesProps) {
    const content = scenes.length === 0
        ? <EmptyState />
        : variant === 'grid'
            ? <ScenesGrid scenes={scenes} selectedId={selectedId} onSelect={onSelect} />
            : <ScenesCarousel scenes={scenes} selectedId={selectedId} onSelect={onSelect} />;

    return (
        <section className="mb-8 sm:mb-16">
            <ExploreHeader hideHeader={hideHeader} />
            {content}
        </section>
    );
}
