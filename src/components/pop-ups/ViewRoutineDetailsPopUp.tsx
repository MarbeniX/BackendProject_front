import type { ReactNode } from "react";

type ViewRoutineDetailsPopUpProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    leading?: ReactNode;
}

export default function ViewRoutineDetailsPopUp({ isOpen, onConfirm, onCancel, leading }: ViewRoutineDetailsPopUpProps) {
    if (!isOpen) return null;
    const container = typeof window !== 'undefined' ? document.body : null;
    if( !container) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-lg animate-fade-in"></div>
            </div>
        </>
    )
}
