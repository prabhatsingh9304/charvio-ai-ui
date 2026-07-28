import { X } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/date"
import type { ConversationResponse } from "@/types/types"

type ConversationItemProps = {
    conversation: ConversationResponse
    isActive: boolean
    onSelect: () => void
    onDelete: (e: React.MouseEvent) => void
}

export function ConversationItem({ conversation, isActive, onSelect, onDelete }: ConversationItemProps) {
    return (
        <button
            onClick={onSelect}
            className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${
                isActive ? "bg-[#d9fdd3]" : ""
            }`}
        >
            <Avatar
                src={conversation.character_avatar || undefined}
                name={conversation.title || "Untitled Chat"}
                size="md"
                className="shrink-0"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.title || "Untitled Chat"}
                    </p>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-xs text-gray-400">
                            {formatDate(conversation.updated_at)}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDelete}
                            className="p-1 hover:bg-red-100 text-gray-400 hover:text-red-500"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                {conversation.last_message && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                        {conversation.last_message}
                    </p>
                )}
            </div>
        </button>
    )
}
