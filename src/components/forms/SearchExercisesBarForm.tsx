import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { exerciseDifficultyArray, exerciseMuscleArray, type ExerciseDifficulty, type ExerciseMuscle } from '@/types/exerciseTypes';
import { searchExercises } from '@/services/RoutineService';

export default function SearchExercisesBarForm() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [muscle, setMuscle] = useState<ExerciseMuscle | undefined>();
    const [difficulty, setDifficulty] = useState<ExerciseDifficulty | undefined>();

    const { data: searchResult, refetch: searchRefetch } = useQuery({
        queryKey: ['search-exercises', debouncedQuery, muscle, difficulty],
        queryFn: () => searchExercises({ title: debouncedQuery, muscle, difficulty }),
        enabled: false,
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query.trim())
        }, 300)
        return() => {
            clearTimeout(timeout)
        }
    },[query])

    useEffect(() => {
        if(debouncedQuery.length > 0 || muscle || difficulty) {
            searchRefetch();
        }
    }, [debouncedQuery, muscle, difficulty, searchRefetch])

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-90 items-center justify-center flex">
                <div className="bg-white p-6 shadow-md rounded-md w-1/2 flex flex-col space-y-2">
                    <label className="text-2xl">Search exercises</label>
                    <div className='flex w-full justify-center'>
                        <input
                            type="text"
                            placeholder="Add exercises to your routine"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />

                        <select
                            value={muscle ?? ''}
                            onChange={(e) => setMuscle(e.target.value as ExerciseMuscle)}
                            className='p-3 border border-gray-300 rounded-lg'
                        >
                            <option value=''>Muscle</option>
                            {exerciseMuscleArray.map((muscle) => (
                                <option
                                    key={muscle}
                                    value={muscle}
                                >{muscle.charAt(0) + muscle.slice(1).toLowerCase()}</option>
                            ))}
                        </select>

                        <select
                            value={difficulty ?? ''}
                            onChange={(e) => setDifficulty(e.target.value as ExerciseDifficulty)}
                            className='p-3 border border-gray-300 rounded-lg'
                        >
                            <option value=''>Difficulty</option>
                            {exerciseDifficultyArray.map((difficulty) => (
                                <option
                                    key={difficulty}
                                    value={difficulty}
                                >{difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}</option>
                            ))}
                        </select>
                        
                        {searchResult && searchResult.length > 0 && (
                            <ul className='mt-13 absolute w-1/2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-y-auto'>
                                {searchResult.map((exercise) => (
                                    <li
                                        key={exercise.id}
                                        className='cursor-pointer hover:bg-gray-100 rounded-md p-2'
                                    >
                                        <p>{exercise.title}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="w-full bg-gray-400 hover:bg-gray-500 cursor-pointer rounded-md p-3 flex items-center justify-center">
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}
