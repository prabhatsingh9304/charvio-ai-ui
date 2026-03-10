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
            <div className="border-b border-zinc-200 dark:border-zinc-800">
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
                                        ? "text-zinc-900 dark:text-zinc-50"
                                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                                    }
                `}
                            >
                                {tab.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-50 rounded-full" />
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
