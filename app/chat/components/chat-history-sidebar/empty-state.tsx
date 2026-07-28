import { MessageSquare } from "lucide-react"

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-gray-400">
            <MessageSquare className="w-10 h-10 mb-2" />
            <p className="text-sm text-center">No previous chats</p>
        </div>
    )
}
