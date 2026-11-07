// src/features/rutinas/api/rutinasApi.ts
import axios from 'axios'
import type { RutinaGlobal } from '../Types/Rutina.types'

// 1. Instancia centralizada de Axios con la URL del .env
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 2. Petición HTTP GET Real hacia el Backend (.NET -> PostgreSQL)
export const obtenerRutinasGlobalesAsync = async (): Promise<RutinaGlobal[]> => {
    const respuesta = await apiClient.get<RutinaGlobal[]>('/routines')
    return respuesta.data
}