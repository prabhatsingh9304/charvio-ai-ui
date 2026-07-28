import { Smile } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmojiButton() {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="p-2 text-[#54656f] hover:text-[#3b4a54] shrink-0"
        >
            <Smile className="w-6 h-6" />
        </Button>
    )
}
