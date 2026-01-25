import { ListFilter } from 'lucide-react'
import AddExerciseDialog from './add-exercise-dialog'

export default function ExerciseActionsButton() {
    return (
        <div className='ml-auto flex items-center p-2 gap-4 rounded-full bg-white'>
            <button type='button'>
                <ListFilter className='text-primary rounded-full p-1 border border-primary' />
            </button>
            <AddExerciseDialog />
        </div>
    )
}
