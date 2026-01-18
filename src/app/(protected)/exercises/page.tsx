import { createClient } from "@/lib/supabase/server";
import { ExerciseWithMuscles } from "@/types/exercises";

export default async function Page() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("exercises").select(`
      id,
      name,
      exercise_muscle_groups (
        muscle_groups ( name )
      )
    `);

    if (error) {
        console.error(error);
        return <p>Failed to load exercises.</p>;
    }

    const exercises: ExerciseWithMuscles[] =
        data?.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            muscle_groups:
                exercise.exercise_muscle_groups?.map(
                    (emg) => emg.muscle_groups.name,
                ) ?? [],
        })) ?? [];

    return (
        <div>
            <h1>Exercises</h1>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        {exercise.name} - {exercise.muscle_groups.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}
