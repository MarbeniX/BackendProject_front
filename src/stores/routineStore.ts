import type { Routine } from '@/types/routineTypes';
import { create } from 'zustand';

type RoutineFormState = {
    showCreateRoutineForm: boolean;
    showAddExerciseForm: boolean;
    showDeleteRoutineConfrmationForm: boolean;
    showViewRoutineDetails?: boolean
    routineId?: Routine['id']

    openCreateRoutineForm: () => void;
    closeCreateRoutineForm: () => void;
    setShowAddExerciseForm: (value: boolean) => void;
    setRoutineId: (id: Routine['id']) => void;
    setShowDeleteRoutineConfrmationForm: (value: boolean) => void;
    setShowViewRoutineDetails: (value: boolean) => void;
}

export const useRoutineFormStore = create<RoutineFormState>((set) => ({
    showCreateRoutineForm: false, 
    showAddExerciseForm: false,
    showDeleteRoutineConfrmationForm: false,

    openCreateRoutineForm: () => set({ showCreateRoutineForm: true}),
    closeCreateRoutineForm: () => set({ showCreateRoutineForm: false}),
    setShowAddExerciseForm: (value) => set({ showAddExerciseForm: value }),
    setRoutineId: (id) => set({ routineId: id }),
    setShowDeleteRoutineConfrmationForm: (value) => set({ showDeleteRoutineConfrmationForm: value}),
    setShowViewRoutineDetails: (value) => set({ showViewRoutineDetails: value})
}))