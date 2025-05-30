import { difficultyColorMap, muscleColorMap, type Exercise } from "@/types/exerciseTypes"
import { Link } from "react-router-dom"

type exerciseCompProps = {
    data: Exercise
}

export default function exerciseComp({data} : exerciseCompProps) {
    const colorMuscle = muscleColorMap[data.muscle]
    const colorDifficulty = difficultyColorMap[data.difficulty]

    return (
        <>
            <div className="flex items-center space-x-4 p-3 bg-gray-100 shadow rounded-md w-full">
                <div className="w-7 h-7 rounded-full" style={{backgroundColor: colorMuscle}}/>

                <div className="flex flex-col">
                    <span className="text-lg">{data.title}</span>
                    <span className="text-sm">{data.description}</span>
                </div>
                
                <div className="text-sm ml-auto p-1 rounded-md" style={{backgroundColor: colorDifficulty}}>
                    {data.difficulty}
                </div>
            </div>
        </>
    )
}
