"use client"

import { Input } from "@/components/ui"

interface ImageUrlInputProps {
    value: string
    onChange: (value: string) => void
}

export function ImageUrlInput({ value, onChange }: ImageUrlInputProps) {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-pink-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or use URL</span>
                </div>
            </div>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
            />
        </>
    )
}
