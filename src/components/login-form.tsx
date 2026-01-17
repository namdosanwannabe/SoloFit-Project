"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/goggle-icon.svg";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const supabase = createClient();
    const router = useRouter();
    const { signInWithGoogle } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleError = (error: unknown) => {
        setError(
            error instanceof Error ? error.message : "Something went wrong"
        );
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/protected");
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={cn("flex flex-col items-center mt-4", className)}
            {...props}
        >
            <form onSubmit={handleLogin} className="w-full">
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/auth/forgot-password"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-600"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </form>

            {/* Divider */}
            <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Google Login */}
            <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={signInWithGoogle}
                disabled={isLoading}
            >
                <Image src={GoogleIcon} alt="Google Icon" className="w-5 h-5" />
                Continue with Google
            </Button>
        </div>
    );
}
