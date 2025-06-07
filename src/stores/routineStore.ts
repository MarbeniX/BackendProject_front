import type { Routine } from '@/types/routineTypes';
import { create } from 'zustand';

type RoutineFormState = {
    showCreateRoutineForm: boolean;
    showAddExerciseForm: boolean;
    routineId?: Routine['id']

    openCreateRoutineForm: () => void;
    closeCreateRoutineForm: () => void;
    setShowAddExerciseForm: (value: boolean) => void;
    setRoutineId: (id: Routine['id']) => void;
}

export const useRoutineFormStore = create<RoutineFormState>((set) => ({
    showCreateRoutineForm: false, 
    showAddExerciseForm: false,

    openCreateRoutineForm: () => set({ showCreateRoutineForm: true}),
    closeCreateRoutineForm: () => set({ showCreateRoutineForm: false}),
    setShowAddExerciseForm: (value) => set({ showAddExerciseForm: value }),
    setRoutineId: (id) => set({ routineId: id }),
}))