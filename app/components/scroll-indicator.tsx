interface ScrollIndicatorProps {
    show: boolean;
}

export function ScrollIndicator({ show }: ScrollIndicatorProps) {
    if (!show) return null;

    return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white to-transparent w-16 h-full pointer-events-none flex items-center justify-end pr-2">
            <div className="text-gray-400 animate-pulse">→</div>
        </div>
    );
}
