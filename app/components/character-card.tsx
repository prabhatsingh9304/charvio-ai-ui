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
                w-full flex-shrink-0 group transition-all duration-300 !border-sky-500 !shadow-[0_0_15px_rgba(14,165,233,0.5)] !bg-transparent hover:!border-sky-400 hover:!shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:!bg-transparent
                ${selected ? "!ring-2 !ring-sky-500 !shadow-sky-500/50 scale-[1.02]" : ""}
            `}
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-xl h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

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
                                <CardTitle className="text-zinc-100 truncate mb-1">
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
                            <div className="relative w-full h-50 rounded-lg overflow-hidden border border-zinc-700/50">
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2 min-h-[40px]">
                            {character.description}
                        </p>

                        <div className="space-y-2">
                            <div>
                                <span className="text-xs font-semibold text-zinc-400 block mb-1">
                                    Personality
                                </span>
                                <p className="text-xs text-zinc-300 line-clamp-2">
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
