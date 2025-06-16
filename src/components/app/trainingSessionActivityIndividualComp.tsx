import type { GetTrainingSessionById } from "@/types/trainingSessionTypes"
import formatReadableDate from "@/utils/formatDate"
import formatTime from "@/utils/formatTime"

type TrainingSessionActivityIndividualCompProps = {
    trainingSession: GetTrainingSessionById
}

export default function trainingSessionActivityIndividualComp({ trainingSession }: TrainingSessionActivityIndividualCompProps) {
    return (
        <>
            <div className="flex justify-between border p-4 rounded-lg shadow-md bg-white items-center">
                <p>{formatReadableDate(trainingSession.trainingDate)}</p>
                <p>{trainingSession.routineId}</p>
                
                <div className="grid grid-cols-2 gap-2">
                    {trainingSession.marks?.map((mark) => (
                        <div key={mark.markId} className="flex space-x-5 p-2 border rounded">
                            <p>Reps: {mark.reps}</p>
                            <p>Set: {mark.setNumber}</p>
                            <p>Time: {formatTime(mark.timeToComplete)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
