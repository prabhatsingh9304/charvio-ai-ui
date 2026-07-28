"use client"

import { Input } from "@/components/ui"

interface SceneFormFieldsProps {
    name: string
    description: string
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
}

export function SceneFormFields({ name, description, onNameChange, onDescriptionChange }: SceneFormFieldsProps) {
    return (
        <>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Name</label>
                <Input
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="e.g. The Rusty Tavern"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Description</label>
                <textarea
                    className="w-full px-3 py-2 bg-white border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px] text-gray-900 placeholder:text-gray-400"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="Describe the atmosphere and setting..."
                    required
                />
            </div>
        </>
    )
}
