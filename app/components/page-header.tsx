import { Button } from "@/components/ui";

interface PageHeaderProps {
    title: string;
    description: string;
    onBack?: () => void;
    actions?: React.ReactNode;
    stats?: Array<{
        value: string | number;
        label: string;
    }>;
}

export function PageHeader({
    title,
    description,
    onBack,
    actions,
    stats
}: PageHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-rose-700 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                        {title}
                    </h1>
                    <p className="text-zinc-300">{description}</p>
                </div>
                <div className="flex gap-2">
                    {actions}
                    {onBack && (
                        <Button variant="outline" onClick={onBack}>
                            ← Back to Home
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
