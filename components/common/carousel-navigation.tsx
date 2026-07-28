"use client"

import { Button } from "@/components/ui"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselNavigationProps {
    showLeftArrow: boolean
    showRightArrow: boolean
    onScrollLeft: () => void
    onScrollRight: () => void
}

export function CarouselNavigation({ showLeftArrow, showRightArrow, onScrollLeft, onScrollRight }: CarouselNavigationProps) {
    return (
        <>
            {showLeftArrow && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onScrollLeft}
                    className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all -ml-2"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
            )}

            {showRightArrow && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onScrollRight}
                    className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all -mr-2"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            )}
        </>
    )
}
