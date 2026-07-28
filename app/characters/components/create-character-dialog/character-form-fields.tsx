"use client"

import { Input, Textarea, Select } from "@/components/ui"
import type { Scene } from "@/types/types"

interface CharacterFormFieldsProps {
    formData: {
        name: string
        personality: string
        background: string
        scene_id: string
    }
    scenes: Scene[]
    onFieldChange: (field: string, value: string) => void
}

export function CharacterFormFields({ formData, scenes, onFieldChange }: CharacterFormFieldsProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => onFieldChange("name", e.target.value)}
                    placeholder="e.g. Eldric the Wise"
                    required
                />

                <Select
                    label="Scene"
                    value={formData.scene_id}
                    onChange={(e) => onFieldChange("scene_id", e.target.value)}
                    options={[{ value: "", label: "Select a scene..." }, ...scenes.map((scene) => ({ value: scene.id, label: scene.name }))]}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Textarea
                    label="Personality"
                    value={formData.personality}
                    onChange={(e) => onFieldChange("personality", e.target.value)}
                    placeholder="Character's personality traits..."
                    className="min-h-[100px]"
                    required
                />

                <Textarea
                    label="Background"
                    value={formData.background}
                    onChange={(e) => onFieldChange("background", e.target.value)}
                    placeholder="Backstory and history..."
                    className="min-h-[100px]"
                    required
                />
            </div>
        </div>
    )
}
