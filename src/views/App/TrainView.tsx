import SearchBarRoutinesComp from "@/components/forms/SearchBarRoutinesComp"
import { useRoutineFormStore } from "@/stores/routineStore"
import HowDoYouWanToTrainPopUp from "@/components/pop-ups/HowDoYouWantToTrainPopUp"
import { FaDumbbell, FaFlag } from "react-icons/fa";
import { MdOutlineSportsGymnastics, MdSaveAlt } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { VscDebugContinue } from "react-icons/vsc";
import { IoPause } from "react-icons/io5";
import { useState, useRef } from "react";
import type { Routine } from "@/types/routineTypes";
import type { Exercise } from "@/types/exerciseTypes";

export default function TrainView() {
    const [time, setTime] = useState(0); // tiempo en milisegundos
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);    
    const [routineID, setRoutineID] = useState<Routine['id']>();
    const [exerciseID, setExerciseID] = useState<Exercise['id']>();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const workoutActions = {
        running: [
            {
                label: 'Change exercise',
                icon: <FaDumbbell />,
                onClick: () => {
                    // Logic to change exercise
                }
            },
            {
                label: 'Start',
                icon: <MdOutlineSportsGymnastics />,
                onClick: () => {
                    onStart()
                }
            },
            {
                label: 'Set marker',
                icon: <FaFlag />,
                onClick: () => {
                    // Logic to set marker
                }
            },
        ],
        stopped: [
            {
                label: 'Continue',
                icon: <VscDebugContinue />,
                onClick: () => {
                    onStart()
                    setIsPaused(false)
                }
            },
            {
                label: 'Reset',
                icon: <RiResetLeftFill />,
                onClick: () => {
                    onReset()
                    setIsPaused(false)
                }
            },
            {
                label: 'Save',
                icon: <MdSaveAlt />,
                onClick: () => {
                    // Logic to set marker
                }
            },
        ],
        pause: [
            {
                label: 'Pause',
                icon: <IoPause />,
                onClick: () => {
                    onPause()
                }   
            }
        ]
    }

    const handleContinueTraining = () => {
        setShowSearchRoutines(false)
        setHowDoYouWantToTrain(false)
    }
    const handleCloseTraining = () => {
        setHowDoYouWantToTrain(true)
        setShowSearchRoutines(false)
    }
    
    const onStart = () => {
        if (!isRunning) {
        setIsRunning(true);
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 10); // cada 10ms
        }, 10);
        }
    };

    const onPause = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsRunning(false);
        setIsPaused(true);
    };

    const onReset = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsRunning(false);
        setTime(0);
    };

    interface FormatTime {
        (ms: number): string;
    }
    const formatTime: FormatTime = (ms) => {
        const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
        const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
        const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
        return `${minutes}:${seconds}:${centiseconds}`;
    };

    const showSearchBarRoutines = useRoutineFormStore((state) => state.showSearchRoutinesBar)
    const showHowDoYouWantToTrain = useRoutineFormStore((state) => state.showHowDoYouWantToTrainPopUp)
    const setShowSearchRoutines = useRoutineFormStore((state) => state.setShowSearchRoutinesBar)
    const setHowDoYouWantToTrain = useRoutineFormStore((state) => state.setShowHowDoYouWantToTrain)
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full bg-fuchsia-300">
                <h1 className="text-3xl">Let's go all out!</h1>
                <div className="p-4 bg-red-400 rounded-lg shadow-lg">
                    <div className="text-6xl font-mono">{formatTime(time)}</div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {(!isPaused) ? (
                        <>
                            <button
                                className="flex items-center justify-center bg-white text-black rounded-lg p-4 mt-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer w-48"
                                onClick={workoutActions.running[0].onClick}
                            >
                            <span className="text-xl mr-2">{workoutActions.running[0].icon}</span>
                                {workoutActions.running[0].label}
                            </button>     

                            {!isRunning ? (
                                <button
                                    className="flex items-center justify-center bg-white text-black rounded-lg p-4 mt-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer w-48"
                                    onClick={workoutActions.running[1].onClick}
                                >
                                <span className="text-xl mr-2">{workoutActions.running[1].icon}</span>
                                    {workoutActions.running[1].label}
                                </button>                 
                            ) : (
                                <button
                                    className="flex items-center justify-center bg-white text-black rounded-lg p-4 mt-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer w-48"
                                    onClick={workoutActions.pause[0].onClick}
                                >
                                <span className="text-xl mr-2">{workoutActions.pause[0].icon}</span>
                                    {workoutActions.pause[0].label}
                                </button>                 
                            )}

                            <button
                                className="flex items-center justify-center bg-white text-black rounded-lg p-4 mt-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer w-48"
                                onClick={workoutActions.running[2].onClick}
                            >
                            <span className="text-xl mr-2">{workoutActions.running[2].icon}</span>
                                {workoutActions.running[2].label}
                            </button>     
                        </>
                    ) : (
                        <>
                            {workoutActions.stopped.map((action) => (
                                <button
                                    key={action.label}
                                    className="flex items-center justify-center bg-white text-black rounded-lg p-4 mt-2 shadow-md hover:bg-gray-100 transition-colors cursor-pointer w-48"
                                    onClick={action.onClick}
                                >
                                <span className="text-xl mr-2">{action.icon}</span>
                                    {action.label}
                                </button>     
                            ))}
                        </>
                    )}
                </div>

                <p className="text-2xl mt-2">Workout by Routine | RoutineName</p>
            </div>


            {showHowDoYouWantToTrain && (
                <HowDoYouWanToTrainPopUp
                    isOpen={showHowDoYouWantToTrain}
                />
            )}

            {showSearchBarRoutines && (
                <SearchBarRoutinesComp
                    isOpen={showSearchBarRoutines}
                    onContinue={handleContinueTraining}
                    onClose={handleCloseTraining}
                    setRoutineID={setRoutineID}
                    setExerciseID={setExerciseID}
                />
            )}
        </>
    )
}
