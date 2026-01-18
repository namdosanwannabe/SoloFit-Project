import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export async function UserDetails() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return (
        <p className="whitespace-break-spaces">
            {JSON.stringify(data.claims, null, 2)}
        </p>
    );
}

export default function Page() {
    return (
        <Suspense fallback="loading...">
            Routines Page
            <LogoutButton />
        </Suspense>
    );
}
