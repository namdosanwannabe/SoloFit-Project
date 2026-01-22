import MobileNavigation from "@/components/mobile-navigation";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="min-h-svh flex flex-col gap-3 sm:flex-row p-6 md:p-10 bg-zinc-100">
                {children}
            </main>
            <MobileNavigation />
        </>
    );
}
