import ReadyToSweat from "@/components/app/readyToSweatComp"
import { useState } from "react"
import ExercisesBig from "@/components/app/exerciseBigComp";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { deleteRoutineById, getAllRoutines } from "@/services/RoutineService";
import RoutineComp from "@/components/app/routineComp";
import type { Routine } from "@/types/routineTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useRoutineFormStore } from "@/stores/routineStore";
import  ConfirmationMessage  from "@/components/messages/confirmation_message"
import ViewRoutineDetailsPopUp from "@/components/pop-ups/ViewRoutineDetailsPopUp";

export default function DashboardVie() {
    const [activeButton, setActiveButton] = useState<"A" | "B">("A");
    const [ selectedRoutineId, setSelectedRoutineId ] = useState<Routine['id'] | null>(null);

    const { data, error } = useQuery({
        queryKey: ['routines'],
        queryFn: getAllRoutines
    })

    const buttons = [
        { id: "A", name: "Routines", onClick: () => handleRoutinesClick() },
        { id: "B", name: "Exercises", onClick: () => handleExercisesClick() },
    ]

    const handleRoutinesClick = () => {
        setActiveButton("A");
    }

    const handleExercisesClick = () => {
        setActiveButton("B");
    }

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteRoutineById,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['routines'] });
        }
    })

    const handleDeleteRoutine = (formData: Routine['id']) => {
        setRoutineId(formData)
        setShowDeleteRoutineConfirmationForm(true);
    }
    
    const handleConfirmDeleteRoutine = (formData: Routine['id']) => {
        setShowDeleteRoutineConfirmationForm(false);
        setShowViewRoutineDetails(false);
        mutate(formData);
    }

    const setRoutineId = useRoutineFormStore((state) => state.setRoutineId)
    const routineId = useRoutineFormStore((state) => state.routineId)
    const setShowDeleteRoutineConfirmationForm = useRoutineFormStore((state) => state.setShowDeleteRoutineConfrmationForm)
    const showDeleteRoutineConfirmationForm = useRoutineFormStore((state) => state.showDeleteRoutineConfrmationForm)
    const showViewRoutineDetails = useRoutineFormStore((state) => state.showViewRoutineDetails)
    const setShowViewRoutineDetails = useRoutineFormStore((state) => state.setShowViewRoutineDetails)

    if(error) {
        return (
            <div className="text-red-500">
                <h2 className="text-2xl">Error loading data</h2>
                <p>{error.message}</p>
            </div>
        );
    }
    if(data) return (
        <>
            <div className="space-y-6 w-full">
                <div className="space-y-6">
                    <h2 className="text-3xl">Home</h2>
                    <ReadyToSweat />
                </div>

                <div className="grid grid-cols-[2fr_1fr] space-x-6"> 
                    <div className="space-y-6">
                        {activeButton === "A" ? (
                            <h2 className="text-2xl">Routines</h2>
                        ) : (
                            <h2 className="text-2xl">Exercises</h2>
                        )}

                        {buttons.map((button) => (
                            <button
                                key={button.id}
                                onClick={button.onClick}
                                className={`text-black p-2 rounded-t-2xl cursor-pointer transition-colors ${
                                    activeButton === button.id
                                        ? "bg-gray-400"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {button.name}
                            </button>
                        ))}
                        
                        {activeButton === "A" ? (
                            <div className="flex flex-col items-center h-full w-full">
                                { data.data.length === 0 ? (
                                    <>
                                        <p className="text-gray-500">No routines available</p>
                                        <Link
                                            to="/my-routines"
                                            className="bg-gray-500 hover:bg-gray-600 text-black p-2 rounded-lg text-center w-auto"
                                        >Create one</Link>
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-5 justify-center items-center w-full">
                                        <div className="grid grid-cols-3 gap-5 w-full">
                                            {data.data.slice(0, 3).map((routine) => (
                                                <RoutineComp 
                                                    key={routine.id} 
                                                    data={routine} 
                                                    onDelete={() => handleDeleteRoutine(routine.id)}
                                                    onViewRoutine={() => {
                                                        setSelectedRoutineId(routine.id)
                                                        setShowViewRoutineDetails(true)
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <Link
                                            to="/my-routines"
                                            className="bg-gray-500 hover:bg-gray-600 text-black p-2 rounded-lg text-center"
                                        >View all routines</Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ExercisesBig />
                        )}
                    </div>

                    <div className="pace-y-6">
                        <h2 className="text-2xl">Recent activity</h2>
                    </div>
                    
                    {showDeleteRoutineConfirmationForm && (
                        <ConfirmationMessage
                            isOpen={showDeleteRoutineConfirmationForm}
                            title="Are you sure you want ot delete this routine?"
                            message="Al information related to this routine will be deleted and cannot be recovered."
                            onConfirm={() => handleConfirmDeleteRoutine(routineId!)}
                            onCancel={() => setShowDeleteRoutineConfirmationForm(false)}
                        />
                    )}
                    
                    {showViewRoutineDetails && (
                        <ViewRoutineDetailsPopUp
                            isOpen={showViewRoutineDetails}
                            data={selectedRoutineId!}
                        />
                    )}
                </div>
            </div>

            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
