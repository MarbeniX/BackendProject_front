import type { ExerciseReceive } from "@/types/exerciseTypes"

type dataBaseExerciseCompProps = {
    exercise: ExerciseReceive
}

export default function dataBaseExercisComp({exercise} : dataBaseExerciseCompProps) {
    return (
        <>
            <div className="flex items-center justify-between p-4 bg-purple-300 rounded-lg shadow-md w-full">
                <div className="w-3/12 flex justify-center">{exercise.id}</div>
                <div className="w-1/12 flex justify-center">
                    <img src={exercise.imageURL} alt={exercise.title} />
                </div>
                <div className="w-2/12 flex justify-center">{exercise.title}</div>
                <div className="w-1/12 flex justify-center">{exercise.muscle}</div>
                <div className="w-1/12 flex justify-center">{exercise.difficulty}</div>
                <div className="w-3/12 flex justify-center">{exercise.description}</div>
                <div className="w-1/12 flex justify-center gap-2">
                    <button 
                        type="button"
                        className="cursor-pointer p-4 bg-blue-500 hover:bg-blue-600 rounded-full"
                    />

                    <button 
                        type="button"
                        className="cursor-pointer p-4 bg-red-500 hover:bg-red-600 rounded-full"
                    />
                </div>
            </div>
        </>
    )
}
