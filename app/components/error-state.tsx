import { Button } from "@/components/ui";

interface ErrorStateProps {
    error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-red-400 font-semibold text-xl mb-2">Error loading data</p>
                <p className="text-sm text-zinc-400 mb-6">{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        </div>
    );
}
