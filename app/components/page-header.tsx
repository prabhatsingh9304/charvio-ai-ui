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
                    <h1 className="text-4xl font-bold text-black mb-2">
                        {title}
                    </h1>
                    <p className="text-black/70">{description}</p>
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
