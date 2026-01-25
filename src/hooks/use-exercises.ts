import { createClient } from "@/lib/supabase/client";
import { getExercises, getMuscleGroups, createExercise } from "@/services/exercises";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "./use-debounce";

export function useGetExecises(search: string) {
    const supabase = createClient();
    const debounceValue = useDebounce(search);

    return useQuery({
        queryKey: ["exercises", debounceValue],
        queryFn: () => getExercises(supabase, debounceValue),
    });
}

export function useGetMuscleGroups() {
    const supabase = createClient();

    return useQuery({
        queryKey: ["muscle-groups"],
        queryFn: () => getMuscleGroups(supabase),
    });
}

export function useCreateExercise() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            name,
            muscleGroupIds,
        }: {
            name: string;
            muscleGroupIds: string[];
        }) => createExercise(supabase, name, muscleGroupIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
        },
    });
}