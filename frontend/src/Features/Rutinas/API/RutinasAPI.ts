// src/features/rutinas/api/rutinasApi.ts
import axios from 'axios'
import type { RutinaGlobal, CrearRutinaGlobalDto, FluentValidationError } from '../Types/Rutina.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

// GET: Obtener catálogo
export const obtenerRutinasGlobalesAsync = async (): Promise<RutinaGlobal[]> => {
    const respuesta = await apiClient.get<RutinaGlobal[]>('/routines')
    if (!Array.isArray(respuesta.data)) {
        throw new Error('La respuesta recibida no es un arreglo JSON válido.')
    }
    return respuesta.data
}

// POST: Crear una rutina
export const crearRutinaGlobalAsync = async (nuevaRutina: CrearRutinaGlobalDto): Promise<RutinaGlobal> => {
    const respuesta = await apiClient.post<RutinaGlobal>('/routines', nuevaRutina)
    return respuesta.data
}

// Extractor de errores de FluentValidation
export const extraerMensajeErrorBackend = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return 'Sin respuesta del servidor (.NET apagado o bloqueo de seguridad CORS).'
        }
        const status = error.response.status
        const data = error.response.data

        if (Array.isArray(data)) {
            const erroresFluent = (data as FluentValidationError[])
                .map((item) => item?.errorMessage)
                .filter((msg): msg is string => typeof msg === 'string' && msg.trim().length > 0)
            if (erroresFluent.length > 0) {
                return `[HTTP ${status}] ${erroresFluent.join(' | ')}`
            }
        }
        if (typeof data === 'string' && data.trim().length > 0) {
            return `[HTTP ${status}] ${data}`
        }
        if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>
            const mensajeExplicito = obj.error || obj.mensaje || obj.message || obj.detail || obj.title
            if (typeof mensajeExplicito === 'string' && mensajeExplicito.trim().length > 0) {
                return `[HTTP ${status}] ${mensajeExplicito}`
            }
        }
        return `[HTTP ${status}] El servidor .NET rechazó la operación.`
    }
    return error instanceof Error ? error.message : 'Error inesperado en la aplicación.'
}