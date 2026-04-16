import { Button } from "@/components/ui";

interface ErrorStateProps {
    error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-rose-600 font-semibold text-xl mb-2">Error loading data</p>
                <p className="text-sm text-black/60 mb-6">{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        </div>
    );
}
