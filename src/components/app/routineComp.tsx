import type { Routine } from "@/types/routineTypes"
import ExerciseComp from "@/components/app/exerciseComp"
import { Link } from "react-router-dom"
import { CiMenuKebab } from "react-icons/ci";
import { useState, useEffect, useRef } from "react"

type routineCompProps = {
    data: Routine,
    onDelete: () => void
}

export default function routineComp({data, onDelete} : routineCompProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const buttons = [
        { id: "1", label: "View routine", link: "" },
        { id: "2", label: "Start session", link: "" },
    ]

    return (
        <>
            <div className="bg-gray-400 flex flex-col rounded-md p-5 shadow-md space-y-3 h-70">
                <div className="space-y-2 w-full max-w-80">
                    <div className="flex justify-between">
                        <h2 className="text-2xl">{data.name}</h2>

                        <div className="relative inline-block text-left" ref={menuRef}>
                            <CiMenuKebab
                                className="cursor-pointer text-2xl"
                                onClick={() => setIsOpen((prev) => !prev)}
                            />

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => {
                                            console.log("Option 1 clicked");
                                            setIsOpen(false);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => {
                                            onDelete();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <p>{data.creationDate}</p>
                        <p>{data.category}</p>
                    </div>

                    <p className="break-words whitespace-normal">{data.description}</p>
                </div>

                <div className="space-y-3 overflow-y-auto pr-2 flex flex-col">
                    {Array.isArray(data.exercises) && data.exercises.length > 0 ? (
                        data.exercises.map((exercise) => (
                            <ExerciseComp key={exercise.id} data={exercise} />
                        ))
                        ) : (
                        <p className="mt-auto">No exercises in this routine</p>
                    )}
                </div>

                <nav className="flex justify-center gap-5 items-center mt-auto">
                    {buttons.map((button) => (
                        <Link
                            key={button.id}
                            to={button.link}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            {button.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}
