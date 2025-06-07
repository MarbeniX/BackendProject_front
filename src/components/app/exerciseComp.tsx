import { difficultyColorMap, muscleColorMap, type Exercise } from "@/types/exerciseTypes"

type exerciseCompProps = {
    data: Exercise
    onClick?: () => void
}

export default function exerciseComp({data, onClick} : exerciseCompProps) {
    const colorMuscle = muscleColorMap[data.muscle]
    const colorDifficulty = difficultyColorMap[data.difficulty]

    return (
        <>
            <div 
                className="flex items-center space-x-4 p-3 bg-gray-100 shadow rounded-md w-full"
                onClick={onClick}
            >
                <div className="w-7 h-7 rounded-full" style={{backgroundColor: colorMuscle}}/>

                <div className="flex flex-col">
                    <span className="font-bold">{data.title}</span>
                    <span className="text-sm">{data.description}</span>
                </div>
                
                <div className="text-sm ml-auto p-1 rounded-md" style={{backgroundColor: colorDifficulty}}>
                    {data.difficulty}
                </div>
            </div>
        </>
    )
}
