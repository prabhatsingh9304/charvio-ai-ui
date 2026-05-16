"use client"

import { useState, type ReactNode } from "react"

type Tab = {
    id: string
    label: string
    content: ReactNode
}

type TabsProps = {
    tabs: Tab[]
    defaultTab?: string
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content

    return (
        <div className="w-full">
            <div className="border-b border-pink-200">
                <nav className="flex gap-8" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  relative py-4 px-1 text-sm font-medium transition-colors duration-200
                  ${isActive
                                        ? "text-gray-900"
                                        : "text-gray-400 hover:text-gray-700"
                                    }
                `}
                            >
                                {tab.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                                )}
                            </button>
                        )
                    })}
                </nav>
            </div>
            <div className="py-8">
                {activeContent}
            </div>
        </div>
    )
}
