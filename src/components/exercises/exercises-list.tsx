"use client"

import { useGetExecises } from "@/hooks/use-exercises";

export default function ExercisesList() {
    const { data: exercises, isPending, isError } = useGetExecises();

    if (isPending) {
        return <div>Loading exercises...</div>;
    }

    if (isError) {
        return <div>Error loading exercises</div>;
    }

    return (
        <ul>
            {exercises?.map((exercise) => (
                <li key={exercise.id}>
                    {exercise.name} - {exercise.muscle_groups.join(", ")}
                </li>
            ))}
        </ul>
    );
}