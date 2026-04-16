"use client"

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Scene } from "@/types/types";
import { Card, CardContent, Button } from "@/components/ui";
import { SceneCard } from "./scene-card";

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
    const router = useRouter();

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
        if (variant === 'carousel') {
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, [scenes, variant]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const Content = () => {
        if (scenes.length === 0) {
            return (
                <Card className="text-center py-12">
                    <CardContent>
                        <div className="text-5xl mb-4">🎬</div>
                        <p className="text-zinc-400">No scenes available</p>
                    </CardContent>
                </Card>
            );
        }

        if (variant === 'grid') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {scenes.map((scene) => (
                        <SceneCard
                            key={scene.id}
                            scene={scene}
                            selected={selectedId === scene.id}
                            onClick={() => onSelect?.(scene)}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div className="relative group">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all -ml-2"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="overflow-x-auto pb-4 px-4 [&::-webkit-scrollbar]:hidden scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex gap-4 min-w-max">
                        {scenes.map((scene) => (
                            <div key={scene.id} className="w-[320px] md:w-[360px]">
                                <SceneCard
                                    scene={scene}
                                    selected={selectedId === scene.id}
                                    onClick={() => onSelect?.(scene)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all -mr-2"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                )}
            </div>
        );
    };

    return (
        <section className="mb-16">
            {!hideHeader && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                            Explore Scenes
                        </h2>
                        <p className="text-sm text-black/60">
                            Choose a setting for your conversation
                        </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/scenes")}>
                        View All →
                    </Button>
                </div>
            )}
            <Content />
        </section>
    );
}
