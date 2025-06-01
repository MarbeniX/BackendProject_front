import { create } from 'zustand';

type RoutineFormState = {
    showCreateRoutineForm: boolean;
    showAddExerciseForm: boolean;
    openCreateRoutineForm: () => void;
    closeCreateRoutineForm: () => void;
    setShowAddExerciseForm: (value: boolean) => void;
}

export const useRoutineFormStore = create<RoutineFormState>((set) => ({
    showCreateRoutineForm: false, 
    showAddExerciseForm: false,
    openCreateRoutineForm: () => set({ showCreateRoutineForm: true}),
    closeCreateRoutineForm: () => set({ showCreateRoutineForm: false}),
    setShowAddExerciseForm: (value) => set({ showAddExerciseForm: value }),
}))