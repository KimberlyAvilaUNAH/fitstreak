// src/features/rutinas/schemas/rutina.schema.ts
import { z } from 'zod'

export const crearRutinaGlobalSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(1, 'El nombre de la rutina no puede estar vacío.')
        .min(3, 'La rutina debe tener al menos 3 caracteres.')
        .max(100, 'El nombre no puede superar los 100 caracteres.')
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,()-]+$/,
            'La rutina contiene caracteres especiales no permitidos.'
        ),
})

export type CrearRutinaGlobalSchemaType = z.infer<typeof crearRutinaGlobalSchema>