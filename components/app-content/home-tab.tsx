import { Card, CardContent } from "@/components/ui/card"

interface HomeTabProps {
    sceneCount: number
    characterCount: number
}

export function HomeTab({ sceneCount, characterCount }: HomeTabProps) {
    return (
        <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
                Welcome to Sim City
            </h1>
            <p className="text-lg text-gray-600">
                Explore immersive scenes and meet fascinating characters in this interactive world.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-3xl font-bold text-gray-900">{sceneCount}</div>
                        <div className="text-sm text-pink-700 mt-1">Scenes</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-3xl font-bold text-gray-900">{characterCount}</div>
                        <div className="text-sm text-rose-700 mt-1">Characters</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-3xl font-bold text-gray-900">∞</div>
                        <div className="text-sm text-pink-700 mt-1">Stories</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
