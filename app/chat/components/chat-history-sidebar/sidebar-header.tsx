import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type SidebarHeaderProps = {
    onClose: () => void
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#075E54] text-white">
            <h2 className="text-lg font-medium">Chats</h2>
            <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 hover:bg-white/10 text-white"
            >
                <X className="w-5 h-5" />
            </Button>
        </div>
    )
}
