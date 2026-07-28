"use client"

import { useRef, useState, useEffect } from "react";
import type { Scene } from "@/types/types";
import { SceneCard } from "@/app/scenes/components/scene-card";
import { CarouselArrows } from "./carousel-arrows";

interface ScenesCarouselProps {
    scenes: Scene[];
    selectedId?: string | null;
    onSelect?: (scene: Scene) => void;
}

export function ScenesCarousel({ scenes, selectedId, onSelect }: ScenesCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [scenes]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative group">
            <CarouselArrows
                showLeft={showLeftArrow}
                showRight={showRightArrow}
                onScrollLeft={() => scroll('left')}
                onScrollRight={() => scroll('right')}
            />

            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="overflow-x-auto pb-4 px-4 [&::-webkit-scrollbar]:hidden scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-4 min-w-max">
                    {scenes.map((scene) => (
                        <div key={scene.id} className="w-[260px] sm:w-[320px] md:w-[360px]">
                            <SceneCard
                                scene={scene}
                                selected={selectedId === scene.id}
                                onClick={() => onSelect?.(scene)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
