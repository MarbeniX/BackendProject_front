import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { exerciseReceiveListSchemaFullDTO, exerciseSchema, type Exercise, type ExerciseForm } from '@/types/exerciseTypes';

export async function addExercise(exercise: ExerciseForm){
    try{
        const formData = new FormData();
        formData.append('title', exercise.title);
        formData.append('description', exercise.description || '');
        formData.append('muscle', exercise.muscle);
        formData.append('difficulty', exercise.difficulty);
        if(exercise.image){
            formData.append('image', exercise.image);
        }

        const url = '/exercise/add-exercise';
        const { data } = await api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    }catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateExerciseById({id, exercise}: {id: Exercise['id'], exercise: ExerciseForm}){
    try{
        const formData = new FormData();
        formData.append('description', exercise.description || '');
        formData.append('title', exercise.title);
        formData.append('muscle', exercise.muscle);
        formData.append('difficulty', exercise.difficulty);
        if(exercise.image){
            formData.append('image', exercise.image);
        }

        const url = `/exercise/${id}`
        const { data } = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data;
    }catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllExercises(){
    try{
        const url = '/exercise/getAllExercises'
        const { data } = await api.get(url);
        const response = exerciseReceiveListSchemaFullDTO.safeParse(data);
        if(response.success){
            return response.data.data;
        }
    }catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteExeciseById(id: Exercise['id']){
    try{
        const url = `/exercise/${id}`;
        const { data } = await api.delete(url);
        return data;
    }catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getExerciseById(id: Exercise['id']){
    try{
        const url = `/exercise/${id}`;
        const { data } = await api.get(url);
        const response = exerciseSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    }catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

