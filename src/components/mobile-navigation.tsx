"use client";

import { Activity, Clock, Dumbbell, ListChecks, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileNavigation = {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
};

const navItems: MobileNavigation[] = [
    {
        id: "routines",
        label: "Routines",
        icon: Dumbbell,
        path: "/routines",
    },
    {
        id: "history",
        label: "History",
        icon: Clock,
        path: "/history",
    },
    {
        id: "progress",
        label: "Progress",
        icon: Activity,
        path: "/progress",
    },
    {
        id: "exercises",
        label: "Exercises",
        icon: ListChecks,
        path: "/exercises",
    },
    {
        id: "profile",
        label: "Profile",
        icon: User,
        path: "/profile",
    },
];

export default function MobileNavigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card shadow-md z-50">
            <ul className="flex justify-around items-center h-16">
                {navItems.map((nav) => {
                    const Icon = nav.icon as LucideIcon;
                    const isActive = pathname === nav.path;
                    const activeClass = isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground";

                    return (
                        <li key={nav.id}>
                            <Link
                                href={nav.path}
                                className={`flex flex-col items-center justify-center text-xs ${activeClass} hover:text-primary transition-colors`}
                            >
                                <Icon className="w-5 h-5 mb-1" />
                                {nav.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
