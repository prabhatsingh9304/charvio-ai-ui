import { useState, useCallback } from "react"

export function useFileUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleFileSelect = useCallback((file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files?.[0]) {
            handleFileSelect(e.dataTransfer.files[0])
        }
    }, [handleFileSelect])

    const reset = useCallback(() => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setIsDragging(false)
    }, [])

    return {
        selectedFile,
        previewUrl,
        isDragging,
        handleFileSelect,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        reset,
    }
}
