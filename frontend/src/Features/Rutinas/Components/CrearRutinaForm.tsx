// src/features/rutinas/components/CrearRutinaForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { RutinaGlobal } from '../Types/Rutina.types'
import { crearRutinaGlobalAsync, extraerMensajeErrorBackend } from '../API/RutinasAPI'
import { crearRutinaGlobalSchema, type CrearRutinaGlobalSchemaType } from '../Schemas/Rutina.Schema'

interface CrearRutinaFormProps {
    onRutinaCreada: (nuevaRutina: RutinaGlobal) => void;
    onCancelar: () => void;
}

export function CrearRutinaForm({ onRutinaCreada, onCancelar }: CrearRutinaFormProps) {
    const [errorServidor, setErrorServidor] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<CrearRutinaGlobalSchemaType>({
        resolver: zodResolver(crearRutinaGlobalSchema),
        mode: 'onChange',
        defaultValues: { nombre: '' },
    })

    const procesarEnvioLimpio = async (datosValidados: CrearRutinaGlobalSchemaType) => {
        try {
            setErrorServidor(null)
            const rutinaCreadaEnBd = await crearRutinaGlobalAsync(datosValidados)
            reset()
            onRutinaCreada(rutinaCreadaEnBd)
        } catch (error) {
            const mensajeExactoDeNet = extraerMensajeErrorBackend(error)

            // Si el dato es duplicado, se muestra en el Input
            if (mensajeExactoDeNet.includes("Ya existe una rutina")) {
                setErrorServidor(mensajeExactoDeNet) 
            } else {
                setErrorServidor(mensajeExactoDeNet)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(procesarEnvioLimpio)} className="bg-[#4A5D3E]/90 border border-[#8A9A5B] rounded-xl p-5 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#F4F1E1] flex items-center gap-2">
                    <span className="text-[#8A9A5B]">✨</span> Registrar Nueva Rutina Global
                </h2>
                <span className="text-xs font-mono text-[#A3B18A] bg-[#242B1F] px-2.5 py-1 rounded border border-[#4A5D3E]">
                    🛡️ Zod + FluentValidation
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Ej. Rutina de estiramiento..."
                        disabled={isSubmitting}
                        autoFocus
                        {...register('nombre', {
                            onChange: () => {
                                if (errorServidor) setErrorServidor(null)
                            },
                        })}
                        className={`w-full bg-[#242B1F] border rounded-lg px-4 py-2.5 text-sm text-[#F4F1E1] placeholder-[#7A8A68] focus:outline-none transition-colors ${
                            errors.nombre
                                ? 'border-amber-500 focus:border-amber-400'
                                : errorServidor
                                    ? 'border-red-500 focus:border-red-400'
                                    : 'border-[#4A5D3E] focus:border-[#8A9A5B]'
                        }`}
                    />
                </div>

                <div className="flex items-center gap-2 self-start">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="bg-[#8A9A5B] hover:bg-[#A3B18A] disabled:bg-[#38442F] disabled:text-[#7A8A68] text-[#242B1F] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '⏳ Guardando...' : '💾 Guardar en BD'}
                    </button>

                    <button
                        type="button"
                        onClick={onCancelar}
                        disabled={isSubmitting}
                        className="bg-[#38442F] hover:bg-[#4A5D3E] text-[#A3B18A] font-medium text-sm px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            {errors.nombre && (
                <p className="text-amber-400 text-xs mt-2.5 font-medium flex items-center gap-1.5">
                    <span>⚡</span> <strong>Validación en vivo:</strong> {errors.nombre.message}
                </p>
            )}

            {errorServidor && (
                <div className="mt-3 bg-red-950/60 border border-red-500/40 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <span><strong>Respuesta de .NET:</strong> {errorServidor}</span>
                </div>
            )}
        </form>
    )
}