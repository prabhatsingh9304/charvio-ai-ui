"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui"
import { createScene, uploadFile } from "@/services/scenes.service"
import { ImageUpload } from "./create-scene-dialog/image-upload"
import { SceneFormFields } from "./create-scene-dialog/scene-form-fields"
import { ImageUrlInput } from "./create-scene-dialog/image-url-input"

interface CreateSceneDialogProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateSceneDialog({ isOpen, onClose }: CreateSceneDialogProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: ""
    })

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)

            let imageUrl = formData.image

            if (selectedFile) {
                const { url } = await uploadFile(selectedFile)
                imageUrl = url
            }

            await createScene({
                ...formData,
                image: imageUrl
            })
            router.refresh()
            onClose()
            setFormData({ name: "", description: "", image: "" })
            setSelectedFile(null)
            setPreviewUrl(null)
        } catch (error) {
            console.error("Failed to create scene:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Scene</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <SceneFormFields
                            name={formData.name}
                            description={formData.description}
                            onNameChange={(value) => setFormData({ ...formData, name: value })}
                            onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-800">Image</label>
                            <ImageUpload
                                previewUrl={previewUrl}
                                onFileSelect={handleFileSelect}
                            />
                            <ImageUrlInput
                                value={formData.image}
                                onChange={(value) => setFormData({ ...formData, image: value })}
                            />
                        </div>
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
                            Create Scene
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
