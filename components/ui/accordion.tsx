"use client"

import { useState, type ReactNode } from "react"

type AccordionItem = {
    id: string
    title: string
    content: ReactNode
    icon?: ReactNode
}

type AccordionProps = {
    items: AccordionItem[]
    allowMultiple?: boolean
    defaultOpen?: string[]
    className?: string
}

export function Accordion({
    items,
    allowMultiple = false,
    defaultOpen = [],
    className = "",
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems((prev) =>
                prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
            )
        } else {
            setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
        }
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id)
                return (
                    <div
                        key={item.id}
                        className="border border-pink-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-pink-300"
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-pink-50/50 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && (
                                    <span className="text-gray-500">
                                        {item.icon}
                                    </span>
                                )}
                                <span className="font-medium text-gray-900">
                                    {item.title}
                                </span>
                            </div>
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="p-4 pt-0 bg-white animate-fade-in">
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    {item.content}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
