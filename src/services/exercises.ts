import { ExerciseMuscleGroup, ExerciseWithMuscles } from "@/types/exercises";
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

export async function getMuscleGroups(
    client: TypedSupabaseClient
): Promise<ExerciseMuscleGroup[]> {
    const { data } = await client
        .from("muscle_groups")
        .select("id, name")
        .order("name", { ascending: true })
        .throwOnError();

    if (!data) return [];

    return data;
}

export async function createExercise(
    client: TypedSupabaseClient,
    name: string,
    muscleGroupIds: string[]
): Promise<{ id: string }> {
    // First, create the exercise
    const { data: exercise, error: exerciseError } = await client
        .from("exercises")
        .insert({ name })
        .select("id")
        .single()
        .throwOnError();

    if (!exerciseError) {
        throw new Error("Failed to create exercise");
    }

    // Then, create the muscle group associations
    if (muscleGroupIds.length > 0) {
        const exerciseMuscleGroups = muscleGroupIds.map((muscleGroupId) => ({
            exercise_id: exercise.id,
            muscle_group_id: muscleGroupId,
        }));

        await client
            .from("exercise_muscle_groups")
            .insert(exerciseMuscleGroups)
            .throwOnError();
    }

    return { id: exercise.id };
}
