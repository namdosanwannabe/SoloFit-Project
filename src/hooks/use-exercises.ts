import { createClient } from "@/lib/supabase/client";
import { getExercises } from "@/services/exercises";
import { useQuery } from "@tanstack/react-query";

export function useGetExecises() {
    const supabase = createClient();

    return useQuery({
        queryKey: ["exercises"],
        queryFn: () => getExercises(supabase),
        staleTime: 1000 * 60,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}