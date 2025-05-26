import { z } from 'zod';
import { exerciseSchema } from './exerciseTypes';

export const routineCategorySchema = z.enum([
    'PULL',
    'PUSH',
    'LEG',
    'CHEST',
    'BACK',
    'CORE',
    'ARMS',
    'FREE',
])

export const categoryColormap: Record<RoutineCategory, string> = {
    PULL: '#edede9',
    PUSH: '#001d3d',
    LEG: '#ca6702',
    CHEST: '#e9d8a6',
    BACK: '#ee9b00',
    CORE: '#ae2012',
    ARMS: '#582c4d',
    FREE: '#9b2226',
}

export const routineSchema = z.object({
    name: z.string().min(1),
    description: z.string().max(200).optional(),
    category: routineCategorySchema
})

export const routineResponseSchema = routineSchema.extend({
    id: z.string(),
    creationDate: z.date(),
    userId: z.string(),
    exercises: z.array(exerciseSchema).optional(),
})

export const routineListResponseSchema = z.array(routineResponseSchema)

export type RoutineCategory = z.infer<typeof routineCategorySchema>
export type RoutineCreateForm = z.infer<typeof routineSchema>
export type Routine = z.infer<typeof routineResponseSchema>
export type RoutineUpdateForm = z.infer<typeof routineSchema>
