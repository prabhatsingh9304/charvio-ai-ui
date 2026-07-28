"use client"

import type { Character, Scene } from "@/types/types";
import { CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from "@/components/ui";
import { BaseCard } from "@/components/common/base-card";

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
        <BaseCard selected={selected} onClick={onClick}>

                <CardHeader>
                    <div className="flex items-start gap-3">
                        <Avatar
                            name={character.name}
                            src={character.avatar || undefined}
                            size="lg"
                            status="online"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-gray-900 truncate mb-1">
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
                        {character.avatar && (
                            <div className="relative w-full h-50 rounded-lg overflow-hidden border border-pink-100/50">
                                <img
                                    src={character.avatar}
                                    alt={character.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 min-h-[40px]">
                            {character.background}
                        </p>

                        <div className="space-y-2">
                            <div>
                                <span className="text-xs font-semibold text-gray-500 block mb-1">
                                    Personality
                                </span>
                                <p className="text-xs text-gray-600 line-clamp-2">
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
        </BaseCard>
    );
}
