"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input, Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui"
import { createScene, uploadFile } from "@/lib/scenes-api"
import { UploadCloud } from "lucide-react"

interface CreateSceneDialogProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateSceneDialog({ isOpen, onClose }: CreateSceneDialogProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. The Rusty Tavern"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Description</label>
                            <textarea
                                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[100px] text-zinc-100 placeholder:text-zinc-500"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the atmosphere and setting..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Image</label>
                            <div
                                className={`
                                    relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                                    ${isDragging ? "border-sky-500 bg-sky-500/10" : "border-zinc-800 hover:border-zinc-700 bg-zinc-900"}
                                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("scene-image-upload")?.click()}
                            >
                                <input
                                    id="scene-image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                                />

                                {previewUrl ? (
                                    <div className="relative w-full aspect-video overflow-hidden rounded-md">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white text-sm font-medium">Click on change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                        <UploadCloud className="w-8 h-8" />
                                        <p className="text-sm">Drag & drop or click to upload</p>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-zinc-800" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#1c1c1c] px-2 text-zinc-500">Or use URL</span>
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
                            Create Scene
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
