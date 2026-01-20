"use client";

import { createQueryClient } from "@/lib/react-query";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (isServer) {
        return createQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = createQueryClient();
        }
        return browserQueryClient;
    }
}

export function ReactQueryClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}