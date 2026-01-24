import ExercisesList from "@/components/exercises/exercises-list";

// async function ExercisesWithData() {
//     const supabase = await createClient();
//     const queryClient = getQueryClient();

//     // Prefetch on server
//     await queryClient.prefetchQuery({
//         queryKey: ["exercises"],
//         queryFn: () => getExercises(supabase),
//     });

//     return (
//         <HydrationBoundary state={dehydrate(queryClient)}>
//             <h1 className="text-3xl font-bold">Exercises</h1>
//             <Input id="search-exercises" className="bg-white rounded-xl border-none shadow-none" placeholder="Search exercise" />
//             <ExercisesList />
//         </HydrationBoundary>
//     );
// }

export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">Exercises</h1>
            <ExercisesList />
        </>
    )
}