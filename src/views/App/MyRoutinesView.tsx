import { getAllRoutines } from "@/services/RoutineService"
import { useQuery } from "@tanstack/react-query"
import RoutineComp from "@/components/app/routineComp";
import { useState } from "react";
import  {CreateNewRoutineForm}  from "@/components/forms/CreateNewRoutineForm";

export default function MyRoutinesView() {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const routinesPerPage = 8
    
    
    const { data, error } = useQuery({
        queryFn: getAllRoutines,
        queryKey: ['my-routines']
    }) 
        
    const routines = data?.data || [];

    const totalPages = Math.ceil(routines.length / routinesPerPage);
    const startIndex = (currentPage - 1) * routinesPerPage;
    const endIndex = startIndex + routinesPerPage;
    const routinesToDisplay = routines.slice(startIndex, endIndex);

    if(error){
        return (
            <div className="text-red-500">
                <h2 className="text-2xl">Error loading data</h2>
            </div>
        );
    }

    if(data)return (
        <>
            <div className="flex flex-col p-4 space-y-8 w-max h-full">
                <h1 className="text-3xl">My routines</h1>

                <div className="flex space-x-5 items-center">
                    <input
                        type="text"
                        placeholder="What do you want to train today?"
                        className="w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button 
                        className="bg-gray-400 hover:bg-gray-500 cursor-pointer rounded-md p-3 flex items-center"
                        onClick={() => setShowForm(true)}
                    >
                        <div className="rounded-full p-2 bg-amber-500 mr-3"/>
                        Create new routine
                    </button>
                </div>
                

                {routines.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 h-full">
                        {routinesToDisplay.map((routine) => (
                            <RoutineComp key={routine.id} data={routine} />
                        ))}
                    </div>
                ) : (
                    <p>Still no routines, create one</p>
                )}
                
                <div className="flex justify-center space-x-2 mt-auto">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-md border ${
                                currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>


                {showForm && (
                    <CreateNewRoutineForm onClose={() => setShowForm(false)} />
                )}
            </div>
        </>
    )
}
