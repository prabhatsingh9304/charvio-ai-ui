"use client"

import { useState } from "react"
import { Input } from "@/components/ui"
import { UploadCloud } from "lucide-react"

interface ImageUploadProps {
    previewUrl: string | null
    onFileSelect: (file: File) => void
    avatarUrl?: string
    onAvatarUrlChange?: (url: string) => void
    inputId?: string
    showUrlInput?: boolean
    aspectRatio?: "video" | "[3/2]"
}

export function ImageUpload({
    previewUrl,
    onFileSelect,
    avatarUrl = "",
    onAvatarUrlChange,
    inputId = "image-upload",
    showUrlInput = false,
    aspectRatio = "video"
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false)

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            onFileSelect(file)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files?.[0]) {
            handleFileSelect(e.dataTransfer.files[0])
        }
    }

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Image</label>
            <div
                className={`
                    relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                    ${isDragging ? "border-pink-500 bg-pink-500/10" : "border-pink-300 hover:border-pink-400 bg-pink-50/50"}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById(inputId)?.click()}
            >
                <input
                    id={inputId}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />

                {previewUrl ? (
                    <div className={`relative w-full aspect-${aspectRatio} overflow-hidden rounded-md`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-medium">Click to change</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-pink-400">
                        <UploadCloud className="w-8 h-8" />
                        <p className="text-sm">Drag & drop or click to upload</p>
                    </div>
                )}
            </div>
            {showUrlInput && (
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
                        value={avatarUrl}
                        onChange={(e) => onAvatarUrlChange?.(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </>
            )}
        </div>
    )
}
