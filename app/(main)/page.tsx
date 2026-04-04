'use client';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-2 bg-linear-to-b from-background to-muted/20 relative">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">Zizone</h1>
                <p className="text-lg text-muted-foreground">Welcome to Zizone</p>
            </div>
        </main >
    );
}
