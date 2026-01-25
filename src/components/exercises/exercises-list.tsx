"use client";

import { Input } from "@/components/ui/input";
import { useGetExecises } from "@/hooks/use-exercises";
import { useState } from "react";
import { SpinnerLoader } from "../spinnder-loader";

export default function ExercisesList() {
    const [search, setSearch] = useState("");
    const { data: exercises, isLoading } = useGetExecises(search);

    return (
        <>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercise"
                className="bg-white rounded-xl border-none shadow-none"
            />
            {isLoading ? (
                <SpinnerLoader className="m-auto" />
            ) : exercises && exercises.length > 0 ? (
                <ul className="bg-white px-4 py-2 rounded-xl">
                    {exercises.map((exercise) => (
                        <li
                            key={exercise.id}
                            className="py-2 font-medium text-base border-b border-zinc-100 last:border-b-0"
                        >
                            {exercise.name}
                            <p className="font-normal text-sm text-muted-foreground">
                                {exercise.muscle_groups.join(", ")}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="py-4 m-auto text-center text-sm text-muted-foreground">
                    No exercises found.
                </p>
            )}
        </>
    );
}
