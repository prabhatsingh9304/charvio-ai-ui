import { Card } from "@/components/ui/card"

export function EmptyChatState() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="bg-white/80 text-[#54656f] text-sm px-4 py-2 shadow-sm text-center">
                Start the conversation by sending a message
            </Card>
        </div>
    )
}
