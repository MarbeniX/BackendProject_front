import type { Routine } from "@/types/routineTypes"
import ExerciseComp from "@/components/app/exerciseComp"
import { Link } from "react-router-dom"

type routineCompProps = {
    data: Routine
}

export default function routineComp({data} : routineCompProps) {
    const buttons = [
        { id: "1", label: "View routine", link: "" },
        { id: "2", label: "Start session", link: "" },
    ]

    return (
        <>
            <div className="bg-gray-400 flex flex-col rounded-md p-5 shadow-md space-y-3 w-full">
                <div className=" flex flex-col space-y-2">
                    <h2 className="text-2xl">{data.name}</h2>
                    <p>{data.creationDate}</p>
                    <p>{data.description}</p>
                </div>

                <div className="flex flex-col space-y-3 max-h-[160px] overflow-y-auto pr-2">
                    {Array.isArray(data.exercises) && data.exercises.length > 0 ? (
                        data.exercises.map((exercise) => (
                            <ExerciseComp key={exercise.id} data={exercise} />
                        ))
                        ) : (
                        <p>No exercises in this routine</p>
                    )}
                </div>

                <nav className="flex justify-between items-center mt-auto">
                    {buttons.map((button) => (
                        <Link
                            key={button.id}
                            to={button.link}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            {button.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}
