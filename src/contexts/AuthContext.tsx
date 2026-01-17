"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        const initAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setUser(session?.user ?? null);
            setLoading(false);
        };

        initAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error("Error  signing in with Google:", error);
            throw error;
        }
    };

    const signOut = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        router.push("/");

        if (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        signInWithGoogle,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
