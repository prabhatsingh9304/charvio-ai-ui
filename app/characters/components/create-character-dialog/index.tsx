"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui"
import { createCharacter } from "@/services/characters.service"
import { getScenes, uploadFile } from "@/services/scenes.service"
import type { Scene } from "@/types/types"
import { CharacterImageUpload } from "./image-upload"
import { CharacterFormFields } from "./character-form-fields"

interface CreateCharacterDialogProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateCharacterDialog({ isOpen, onClose }: CreateCharacterDialogProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [scenes, setScenes] = useState<Scene[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        personality: "",
        background: "",
        avatar: "",
        scene_id: ""
    })

    useEffect(() => {
        if (isOpen) {
            getScenes().then(setScenes).catch(console.error)
        }
    }, [isOpen])

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleFieldChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)

            let avatarUrl = formData.avatar

            if (selectedFile) {
                const { url } = await uploadFile(selectedFile)
                avatarUrl = url
            }

            await createCharacter({
                ...formData,
                avatar: avatarUrl
            })

            router.refresh()
            onClose()
            setFormData({
                name: "",
                personality: "",
                background: "",
                avatar: "",
                scene_id: ""
            })
            setSelectedFile(null)
            setPreviewUrl(null)
        } catch (error) {
            console.error("Failed to create character:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent size="lg">
                <DialogHeader>
                    <DialogTitle>Create New Character</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <CharacterFormFields
                            formData={formData}
                            scenes={scenes}
                            onFieldChange={handleFieldChange}
                        />

                        <CharacterImageUpload
                            previewUrl={previewUrl}
                            avatarUrl={formData.avatar}
                            onFileSelect={handleFileSelect}
                            onAvatarUrlChange={(url: string) => handleFieldChange("avatar", url)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={loading}
                        >
                            Create Character
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
