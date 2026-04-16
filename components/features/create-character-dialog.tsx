"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input, Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui"
import { createCharacter } from "@/lib/characters-api"
import { getScenes, uploadFile } from "@/lib/scenes-api"
import type { Scene } from "@/types/types"
import { UploadCloud } from "lucide-react"

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
    const [isDragging, setIsDragging] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        personality: "",
        background: "",
        image: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)

            let imageUrl = formData.image

            if (selectedFile) {
                const { url } = await uploadFile(selectedFile)
                imageUrl = url
            }

            await createCharacter({
                ...formData,
                image: imageUrl
            })

            router.refresh()
            onClose()
            setFormData({
                name: "",
                description: "",
                personality: "",
                background: "",
                image: "",
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black">Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Eldric the Wise"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black">Scene</label>
                                <select
                                    className="w-full px-3 py-2 bg-white dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-black dark:text-pink-100"
                                    value={formData.scene_id}
                                    onChange={(e) => setFormData({ ...formData, scene_id: e.target.value })}
                                    required
                                >
                                    <option value="">Select a scene...</option>
                                    {scenes.map((scene) => (
                                        <option key={scene.id} value={scene.id}>
                                            {scene.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black">Description</label>
                            <textarea
                                className="w-full px-3 py-2 bg-white dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[80px] text-black dark:text-pink-100 placeholder:text-pink-400"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black">Personality</label>
                                <textarea
                                    className="w-full px-3 py-2 bg-white dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px] text-pink-900 dark:text-pink-100 placeholder:text-pink-400"
                                    value={formData.personality}
                                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                                    placeholder="Character's personality traits..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black">Background</label>
                                <textarea
                                    className="w-full px-3 py-2 bg-white dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px] text-pink-900 dark:text-pink-100 placeholder:text-pink-400"
                                    value={formData.background}
                                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                                    placeholder="Backstory and history..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black">Image</label>
                            <div
                                className={`
                                    relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                                    ${isDragging ? "border-pink-500 bg-pink-500/10" : "border-pink-200 hover:border-pink-300 bg-pink-50/50 dark:bg-pink-950/50"}
                                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("char-image-upload")?.click()}
                            >
                                <input
                                    id="char-image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                                />

                                {previewUrl ? (
                                    <div className="relative w-full aspect-video md:aspect-[3/2] overflow-hidden rounded-md">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white text-sm font-medium">Click on change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-pink-400">
                                        <UploadCloud className="w-8 h-8" />
                                        <p className="text-sm">Drag & drop or click to upload</p>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-pink-100 dark:border-pink-800" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-pink-950 px-2 text-pink-400">Or use URL</span>
                                </div>
                            </div>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
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
                            Create Character
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
