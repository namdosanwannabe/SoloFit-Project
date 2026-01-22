"use client"

import { useGetExecises } from "@/hooks/use-exercises";

export default function ExercisesList() {
    const { data: exercises } = useGetExecises();

    return (
        <ul className="bg-white px-6 py-3 rounded-xl">
            {exercises?.map((exercise) => (
                <li
                    key={exercise.id}
                    className="py-3 font-semibold text-lg border-b border-zinc-100 last:border-b-0"
                >
                    {exercise.name}
                    <p className="font-normal text-sm text-muted-foreground">
                        {exercise.muscle_groups.join(", ")}
                    </p>
                </li>
            ))}
        </ul>
    );
}