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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                        {title}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">{description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
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
