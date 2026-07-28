"use client"

import { CarouselNavigation } from "@/components/common/carousel-navigation"

interface CarouselArrowsProps {
    showLeft: boolean;
    showRight: boolean;
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export function CarouselArrows({ showLeft, showRight, onScrollLeft, onScrollRight }: CarouselArrowsProps) {
    return (
        <CarouselNavigation
            showLeftArrow={showLeft}
            showRightArrow={showRight}
            onScrollLeft={onScrollLeft}
            onScrollRight={onScrollRight}
        />
    );
}
