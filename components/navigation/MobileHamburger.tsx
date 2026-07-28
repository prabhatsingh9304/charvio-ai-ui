"use client"

interface MobileHamburgerProps {
    isOpen: boolean
    onToggle: () => void
}

export function MobileHamburger({ isOpen, onToggle }: MobileHamburgerProps) {
    return (
        <button
            onClick={onToggle}
            className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
            aria-label="Toggle menu"
        >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>
    )
}
