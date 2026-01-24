import { createClient } from "@/lib/supabase/client";
import { getExercises } from "@/services/exercises";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./use-debounce";

export function useGetExecises(search: string) {
    const supabase = createClient();
    const debounceValue = useDebounce(search);

    return useQuery({
        queryKey: ["exercises", debounceValue],
        queryFn: () => getExercises(supabase, debounceValue),
    });
}