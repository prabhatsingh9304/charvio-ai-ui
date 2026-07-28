import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type SendButtonProps = {
    onClick: () => void
    disabled?: boolean
    isLoading?: boolean
}

export function SendButton({ onClick, disabled = false, isLoading = false }: SendButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            isLoading={isLoading}
            className="w-[48px] h-[48px] rounded-full bg-[#00a884] hover:bg-[#008f72] text-white shadow-sm shrink-0 cursor-pointer p-0"
        >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        </Button>
    )
}
