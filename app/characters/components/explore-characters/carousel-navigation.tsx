"use client"

import { CarouselNavigation as SharedCarouselNavigation } from "@/components/common/carousel-navigation"

interface CarouselNavigationProps {
    showLeftArrow: boolean
    showRightArrow: boolean
    onScrollLeft: () => void
    onScrollRight: () => void
}

export function CarouselNavigation({ showLeftArrow, showRightArrow, onScrollLeft, onScrollRight }: CarouselNavigationProps) {
    return (
        <SharedCarouselNavigation
            showLeftArrow={showLeftArrow}
            showRightArrow={showRightArrow}
            onScrollLeft={onScrollLeft}
            onScrollRight={onScrollRight}
        />
    )
}
