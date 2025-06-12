import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { routineCategoryArray, type RoutineCategory } from "@/types/routineTypes";
import { searchRoutines } from "@/services/TrainingService";
import { IoMdClose } from "react-icons/io";

type SearchBarRoutinesCompProps = {
    isOpen: boolean;
    onContinue: () => void;
    onClose: () => void;
}

export default function SearchBarRoutinesComp({ isOpen, onContinue, onClose } : SearchBarRoutinesCompProps) {
    if(!isOpen) return null;
    const container = typeof window !== 'undefined' ? document.body : null;
    if(!container) return null;

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [category, setCategory] = useState<RoutineCategory | undefined>(undefined);
    const [routineName, setRoutineName] = useState('');

    const { data: searchRoutinesData, refetch: searchRoutinesRefetch } = useQuery({
        queryKey: ['search-routines-train', debouncedQuery, category],
        queryFn: () => searchRoutines({name: debouncedQuery, category}),
        enabled: false,
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query.trim())
        }, 100)
        return () => {
            clearTimeout(timeout)
        }
    }, [query])

    useEffect(() => {
        if(debouncedQuery.length > 0 || category) {
            searchRoutinesRefetch();
        }
    }, [debouncedQuery, category, searchRoutinesRefetch])

    const handleTrain = () => {
        if(routineName !== '') {
            onContinue();
        }
    }

    return createPortal (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-[50%] space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-3xl">Search Routines</label>
                        <IoMdClose 
                            className="text-2xl cursor-pointer"
                            onClick={onClose}
                        />
                    </div>

                    <div className="flex justify-center">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <select
                            value={category ?? ''}
                            onChange={(e) => setCategory(e.target.value as RoutineCategory)}
                            className="border border-gray-300 rounded-md p-2 w-1/3"
                            style={{ textAlign: 'center' }}
                        >
                            <option value="">Category</option>
                            {routineCategoryArray.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                >{cat}</option>
                            ))}
                        </select>

                        {searchRoutinesData && searchRoutinesData.length > 0 && (
                            <ul className="mt-10 absolute w-1/2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-y-auto">
                                {searchRoutinesData.map((routine) => (
                                    <li
                                        key={routine.id}
                                        className="cursor-pointer hover:bg-gray-100 rounded-md p-2"
                                        onClick={() => setRoutineName(routine.name)}
                                    >
                                        {routine.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <h3 className="rounded-md text-center bg-green-300 text-2xl p-2 w-1/2">Routine: {routineName}</h3>
                        <button
                            type="button"
                            className= "w-1/2 cursor-pointer bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors text-2xl"
                            onClick={handleTrain}
                        >Train</button>
                    </div>
                </div>
            </div>
        </>,
        container
    )
}
