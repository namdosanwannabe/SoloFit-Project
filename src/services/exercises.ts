import { ExerciseWithMuscles } from "@/types/exercises";
import { TypedSupabaseClient } from "@/types/supabase.types";

export async function getExercises(
    client: TypedSupabaseClient
): Promise<ExerciseWithMuscles[]> {
    const { data } = await client
        .from("exercises")
        .select(`
      id,
      name,
      exercise_muscle_groups (
        muscle_groups ( name )
      )
    `)
        .order("name", {
            referencedTable: "exercise_muscle_groups.muscle_groups",
            ascending: true,
        })
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
