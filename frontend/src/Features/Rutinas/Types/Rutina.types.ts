// src/features/rutinas/types/rutina.types.ts

export interface RutinaGlobal {
    id: number;
    nombre: string;
}

// Contrato de Entrada (Payload del POST)
export interface CrearRutinaGlobalDto {
    nombre: string;
}

// Contrato de Error de FluentValidation (.NET)
export interface FluentValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue?: unknown;
    errorCode?: string;
}