"use client"

import { useRouter } from "next/navigation";
import type { Scene } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Tooltip } from "@/components/ui";

interface SceneCardProps {
    scene: Scene;
    selected?: boolean;
    onClick?: () => void;
}

export function SceneCard({ scene, selected, onClick }: SceneCardProps) {
    const router = useRouter();

    return (
        <Card
            className={`
                w-full flex-shrink-0 group transition-all duration-300 !border-pink-200 !shadow-[0_0_15px_rgba(244,114,182,0.2)] !bg-white/80 hover:!border-pink-300 hover:!shadow-[0_0_25px_rgba(244,114,182,0.3)]
                ${selected ? "!ring-2 !ring-pink-500 !shadow-pink-500/50 scale-[1.02]" : ""}
            `}
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-xl h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-black flex-1">
                            {scene.name}
                        </CardTitle>
                        {selected ? (
                            <Badge variant="primary" size="sm">Selected</Badge>
                        ) : (
                            <Tooltip content="View scene details" position="top">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push("/scenes");
                                    }}
                                    className="text-pink-300 hover:text-pink-500 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-2">
                        {scene.image && (
                            <div className="relative w-full h-50 rounded-lg overflow-hidden border border-pink-100/50">
                                <img
                                    src={scene.image}
                                    alt={scene.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <p className="text-sm text-black/80 leading-relaxed line-clamp-3 min-h-[60px]">
                            {scene.description}
                        </p>

                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/characters?scene=${scene.id}`);
                            }}
                        >
                            View Characters
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
