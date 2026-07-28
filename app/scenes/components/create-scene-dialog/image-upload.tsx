"use client"

import { ImageUpload as SharedImageUpload } from "@/components/common/image-upload"

interface SceneImageUploadProps {
    previewUrl: string | null
    onFileSelect: (file: File) => void
}

export function ImageUpload({ previewUrl, onFileSelect }: SceneImageUploadProps) {
    return (
        <SharedImageUpload
            previewUrl={previewUrl}
            onFileSelect={onFileSelect}
            inputId="scene-image-upload"
            showUrlInput={false}
            aspectRatio="video"
        />
    )
}
