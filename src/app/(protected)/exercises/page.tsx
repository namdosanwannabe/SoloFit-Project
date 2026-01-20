import ExercisesList from "@/components/exercises/exercises-list";
import { createQueryClient } from "@/lib/react-query";
import { createClient } from "@/lib/supabase/server";
import { getExercises } from "@/services/exercises";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

async function ExercisesWithData() {
    const supabase = await createClient();
    const queryClient = createQueryClient();

    // Prefetch on server
    await queryClient.prefetchQuery({
        queryKey: ["exercises"],
        queryFn: () => getExercises(supabase),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <h1>Exercises</h1>
            <ExercisesList />
        </HydrationBoundary>
    );
}

export default function Page() {
    return (
        <Suspense fallback="Loading...">
            <ExercisesWithData />
        </Suspense>
    )
}