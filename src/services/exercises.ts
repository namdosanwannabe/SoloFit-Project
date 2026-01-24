import { ExerciseWithMuscles } from "@/types/exercises";
import { TypedSupabaseClient } from "@/types/supabase.types";

export async function getExercises(
    client: TypedSupabaseClient,
    search?: string
): Promise<ExerciseWithMuscles[]> {
    let query = client
        .from("exercises")
        .select(`
        id,
        name,
        exercise_muscle_groups (
          muscle_groups ( name )
        )
      `);

    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
        query = query.ilike("name", `%${trimmedSearch}%`);
    }

    const { data } = await query
        .order("name", { ascending: true })
        .throwOnError();

    if (!data) return [];

    return data.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        muscle_groups:
            exercise.exercise_muscle_groups?.map(
                (emg) => emg.muscle_groups.name
            ) ?? [],
    }));
}
