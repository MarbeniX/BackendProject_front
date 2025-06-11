import type { Routine, RoutineUpdateForm } from '@/types/routineTypes';
import { create } from 'zustand';

type RoutineFormState = {
    showCreateRoutineForm: boolean;
    showAddExerciseForm: boolean;
    showDeleteRoutineConfrmationForm: boolean;
    showViewRoutineDetails?: boolean
    showSaveChangesConfirmationForm: boolean
    routineId: Routine['id']
    updateRoutineFormData: RoutineUpdateForm | null,
    editMode: boolean,
    adminPage: boolean,

    openCreateRoutineForm: () => void;
    closeCreateRoutineForm: () => void;
    setShowAddExerciseForm: (value: boolean) => void;
    setRoutineId: (id: Routine['id']) => void;
    setShowDeleteRoutineConfrmationForm: (value: boolean) => void;
    setShowViewRoutineDetails: (value: boolean) => void;
    setShowSaveChangesConfirmationForm: (value: boolean) => void;
    setUpdateRoutineFormData: (id: Routine['id'], formData: RoutineUpdateForm) => void;
    setEditMode: (value: boolean) => void;
    setAdminPage: (value: boolean) => void;
}

export const useRoutineFormStore = create<RoutineFormState>((set) => ({
    showCreateRoutineForm: false, 
    showAddExerciseForm: false,
    showDeleteRoutineConfrmationForm: false,
    showSaveChangesConfirmationForm: false,
    routineId: '',
    updateRoutineFormData: null,
    editMode: false,
    adminPage: false,

    openCreateRoutineForm: () => set({ showCreateRoutineForm: true}),
    closeCreateRoutineForm: () => set({ showCreateRoutineForm: false}),
    setShowAddExerciseForm: (value) => set({ showAddExerciseForm: value }),
    setRoutineId: (id) => set({ routineId: id }),
    setShowDeleteRoutineConfrmationForm: (value) => set({ showDeleteRoutineConfrmationForm: value}),
    setShowViewRoutineDetails: (value) => set({ showViewRoutineDetails: value}),
    setShowSaveChangesConfirmationForm: (value) => set({ showSaveChangesConfirmationForm: value }),
    setUpdateRoutineFormData: (id, updateRoutineFormData) => set({routineId: id, updateRoutineFormData, showSaveChangesConfirmationForm: true}),
    setEditMode: (value) => set({ editMode: value}),
    setAdminPage: (value) => set({ adminPage: value }),
}))