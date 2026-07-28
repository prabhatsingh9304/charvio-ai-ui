import { ArrowLeft, MoreVertical } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { SessionResponse } from "@/types/types"

type ChatHeaderProps = {
    session: SessionResponse
    isSending: boolean
    onBack: () => void
    onMenuClick: () => void
}

export function ChatHeader({ session, isSending, onBack, onMenuClick }: ChatHeaderProps) {
    const firstCharacter = Object.values(session.characters)[0]

    return (
        <div className="bg-[#075E54] text-white px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 shadow-md z-30 shrink-0">
            <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-1 hover:bg-white/10 text-white"
            >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <div className="relative">
                <Avatar
                    src={firstCharacter?.image || undefined}
                    name={firstCharacter?.name ?? "Character"}
                    size="md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
                <h1 className="text-base font-medium truncate leading-tight">
                    {firstCharacter?.name ?? "Character"}
                </h1>
                <p className="text-xs text-white/70 truncate">
                    {isSending ? "typing..." : "online"}
                </p>
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="p-2 hover:bg-white/10 text-white"
            >
                <MoreVertical className="w-5 h-5" />
            </Button>
        </div>
    )
}
