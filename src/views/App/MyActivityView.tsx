import { getAllTrainingSession } from "@/services/TrainingService"
import { useQuery } from "@tanstack/react-query"

export default function MyActivityView() {
    const { data: trainingSessionss } = useQuery({
        queryKey: ['trainingSessions'],
        queryFn: getAllTrainingSession,
    })

    return (
        <>
            <div className="flex flex-col space-y-4">
                <h1 className="text-3xl">My activity</h1>
                <p>Each recorded session shows your, the effort you've put in, and the exercises completed</p>

                { trainingSessionss && trainingSessionss.data.length > 0 ? (
                    <p>hi</p>
                ) : (
                    <p>Go training you fatty</p>
                )}
            </div>
        </>
    )
}
