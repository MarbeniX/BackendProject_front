import { z } from 'zod';

export const trainingSessionExerciseSchema = z.object({
    exerciseId: z.string(),
    timeToComplete: z.number().min(0),
    setNumer: z.number().min(1),
    reps: z.number().min(0),
    trainingSessionId: z.string(),
})

export const trainingSessionExerciseListSchema = z.array(trainingSessionExerciseSchema);

export const trainingSessionSchema = z.object({
    id: z.string(),
    exercises: trainingSessionExerciseListSchema,
    trainingDate: z.date(),
    userId: z.string(),
    routineId: z.string().optional(),
})

export const getTrainingSessionMarksSchema = z.object({
    markId: z.string(),
    exerciseId: z.string(),
    timeToComplete: z.number().min(0),
    setNumber: z.number().min(1),
    reps: z.number().min(0),
})

export const getTrainingSessionByIdSchema = z.object({
    marks: z.array(getTrainingSessionMarksSchema).optional(),
    trainingDate: z.date(),
    routineId: z.string().optional(),
    sessionId: z.string(),
})

export const getTrainingSessionByIdListSchema = z.array(getTrainingSessionByIdSchema);

export const searchTrainingSessionFilterSchema = z.enum([
    '1week',
    '2weeks',
    '3weeks',
    '1month',
    '3months',
    'all'
])

export type TrainingSessionExercise = z.infer<typeof trainingSessionExerciseSchema>;
export type TrainingSession = z.infer<typeof trainingSessionSchema>;
export type TrainingSessionExerciseList = z.infer<typeof trainingSessionExerciseListSchema>;
export type TrainingSessionMarks = z.infer<typeof getTrainingSessionMarksSchema>;
export type TrainingSessionSearchFilter = z.infer<typeof searchTrainingSessionFilterSchema>;