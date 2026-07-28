import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

type NewChatButtonProps = {
    onClick: () => void
}

export function NewChatButton({ onClick }: NewChatButtonProps) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className="w-full justify-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
            leftIcon={
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                </div>
            }
        >
            <span className="text-[#075E54] font-medium">New Chat</span>
        </Button>
    )
}
