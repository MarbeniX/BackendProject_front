import { getAllRoutines } from "@/services/RoutineService"
import { useQuery } from "@tanstack/react-query"
import RoutineComp from "../app/routineComp"

export default function routineResumeComp() {
    const { data, error } = useQuery({
        queryKey: ['routines'],
        queryFn: getAllRoutines,
    });

    console.log(data)

    if(error) return <p>Error al cargar las rutinas</p>
    if(data) return (
        <>
            <div className="grid lg:grid-cols-3 gap-5">
                {data.data.slice(0,3).map((routine) => (
                    <RoutineComp key={routine.id} data={routine} />
                ))}
            </div>
        </>
    )
}
