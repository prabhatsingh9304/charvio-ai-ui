"use client"

import type { Character, Scene } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from "@/components/ui";

interface CharacterCardProps {
    character: Character;
    scene?: Scene;
    isCreating: boolean;
    onStartChat: (character: Character) => void;
    selected?: boolean;
    onClick?: () => void;
}

export function CharacterCard({ character, scene, isCreating, onStartChat, selected, onClick }: CharacterCardProps) {
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
                    <div className="flex items-start gap-3">
                        <Avatar
                            name={character.name}
                            src={character.image || undefined}
                            size="lg"
                            status="online"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-black truncate mb-1">
                                    {character.name}
                                </CardTitle>
                                {selected && <Badge variant="primary" size="sm">Selected</Badge>}
                            </div>
                            {scene && (
                                <Badge variant="default" size="sm">
                                    {scene.name}
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-2">
                        {character.image && (
                            <div className="relative w-full h-50 rounded-lg overflow-hidden border border-pink-100/50">
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <p className="text-sm text-black/80 leading-relaxed line-clamp-2 min-h-[40px]">
                            {character.description}
                        </p>

                        <div className="space-y-2">
                            <div>
                                <span className="text-xs font-semibold text-black/40 block mb-1">
                                    Personality
                                </span>
                                <p className="text-xs text-black/70 line-clamp-2">
                                    {character.personality}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            size="sm"
                            className="w-full"
                            isLoading={isCreating}
                            onClick={(e) => {
                                e.stopPropagation();
                                onStartChat(character);
                            }}
                        >
                            {isCreating ? "Starting..." : "💬 Start Chat"}
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
