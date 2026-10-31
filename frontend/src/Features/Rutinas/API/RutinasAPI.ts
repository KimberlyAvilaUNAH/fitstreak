// src/features/rutinas/api/rutinasApi.ts
import type { RutinaGlobal } from '../Types/Rutina.types'

export const obtenerRutinasGlobalesAsync = (): Promise<RutinaGlobal[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const datosCatalogo: RutinaGlobal[] = [
                { id: 1, nombre: 'Cardio: 20 minutos de trote continuo' },
                { id: 2, nombre: 'Fuerza: Tren superior (Pecho y Espalda)' },
                { id: 3, nombre: 'Yoga y Flexibilidad matutina' },
                { id: 4, nombre: 'HIIT: 15 minutos de alta intensidad' },
                { id: 5, nombre: 'Fuerza: Tren inferior (Piernas)' },
                { id: 6, nombre: 'Estiramientos y recuperación muscular' },
            ]
            resolve(datosCatalogo)
        }, 1000) // Simula 1 segundo de latencia
    })
}