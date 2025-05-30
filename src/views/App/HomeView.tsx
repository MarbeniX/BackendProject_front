import ReadyToSweat from "@/components/app/readyToSweatComp"
import { useState } from "react"
import Routines from "@/components/app/routineResumeComp";
import ExercisesBig from "@/components/app/exerciseBigComp";
import { Link } from "react-router-dom";

export default function DashboardVie() {
    const [activeButton, setActiveButton] = useState<"A" | "B">("A");

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

    return (
        <>
            <div className="space-y-6">
                <div className="space-y-6">
                    <h2 className="text-3xl">Hi!</h2>
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
                            <div className="flex flex-col space-y-4 items-center">
                                <Routines />
                                <Link
                                    to=""
                                    className="bg-gray-500 hover:bg-gray-600 text-black p-2 rounded-lg text-center w-auto"
                                >View all routines</Link>
                            </div>
                        ) : (
                            <ExercisesBig />
                        )}
                    </div>

                    <div className="flex flex-col space-y-6">
                        <h2 className="text-2xl">Recent activity</h2>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
