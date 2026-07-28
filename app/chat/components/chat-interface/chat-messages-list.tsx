import { MessageBubble } from "@/components/ui"
import type { ChatMessage, SessionResponse } from "@/types/types"

type ChatMessagesListProps = {
    messages: ChatMessage[]
    session: SessionResponse
}

export function ChatMessagesList({ messages, session }: ChatMessagesListProps) {
    const getAvatarDetails = (speaker: string) => {
        if (speaker === "user") {
            return {
                avatarUrl: undefined,
                name: "You"
            }
        }

        if (speaker === "narrator") {
            return {
                avatarUrl: undefined,
                name: "Narrator"
            }
        }

        if (speaker === "system") {
            return {
                avatarUrl: undefined,
                name: "System"
            }
        }

        const character = Object.values(session.characters).find(
            c => c.name.toLowerCase() === speaker.toLowerCase()
        )

        return {
            avatarUrl: character?.image || undefined,
            name: character?.name || speaker
        }
    }

    return (
        <>
            {messages.map((msg, index) => {
                const { avatarUrl, name } = getAvatarDetails(msg.speaker)
                return (
                    <MessageBubble
                        key={index}
                        message={msg}
                        avatarUrl={avatarUrl}
                        senderName={name}
                    />
                )
            })}
        </>
    )
}
