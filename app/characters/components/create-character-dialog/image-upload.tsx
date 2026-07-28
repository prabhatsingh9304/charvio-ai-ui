"use client"

import { ImageUpload } from "@/components/common/image-upload"

interface CharacterImageUploadProps {
    previewUrl: string | null
    avatarUrl: string
    onFileSelect: (file: File) => void
    onAvatarUrlChange: (url: string) => void
}

export function CharacterImageUpload({ previewUrl, avatarUrl, onFileSelect, onAvatarUrlChange }: CharacterImageUploadProps) {
    return (
        <ImageUpload
            previewUrl={previewUrl}
            avatarUrl={avatarUrl}
            onFileSelect={onFileSelect}
            onAvatarUrlChange={onAvatarUrlChange}
            inputId="char-image-upload"
            showUrlInput={true}
            aspectRatio="video"
        />
    )
}
