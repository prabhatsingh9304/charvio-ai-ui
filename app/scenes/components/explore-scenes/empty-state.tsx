import { Card, CardContent } from "@/components/ui";

export function EmptyState() {
    return (
        <Card className="text-center py-12">
            <CardContent>
                <div className="text-5xl mb-4">🎬</div>
                <p className="text-zinc-400">No scenes available</p>
            </CardContent>
        </Card>
    );
}
