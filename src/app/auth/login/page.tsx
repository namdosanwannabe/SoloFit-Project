import { LoginForm } from "@/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/public/favicon/favicon.svg";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex flex-col gap-6 min-h-svh w-full items-center justify-start px-6 py-16 md:px-10 md:py-16">
            <Image src={Logo} alt="SoloFit Icon" className="w-13 text-primary" />
            <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="text-4xl font-bold">SoloFit</h1>
                <p className="text-sm text-muted-foreground">
                    Start by logging in or creating a new account.
                </p>
            </div>
            <div className="w-full max-w-sm">
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="signup">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
