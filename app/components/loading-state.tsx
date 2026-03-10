export function LoadingState() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
                <p className="mt-4 text-lg font-medium text-zinc-300">Loading...</p>
            </div>
        </div>
    );
}
