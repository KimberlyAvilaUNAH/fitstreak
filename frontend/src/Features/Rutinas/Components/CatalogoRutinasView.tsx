// src/features/rutinas/components/CatalogoRutinasView.tsx
import { useState, useEffect } from 'react'
import type { RutinaGlobal } from '../Types/Rutina.types'
import { obtenerRutinasGlobalesAsync } from '../API/RutinasAPI'
import { RutinaGlobalCard } from './RutinaGlobalCard'

export function CatalogoRutinasView() {
    const [rutinas, setRutinas] = useState<RutinaGlobal[]>([])
    const [cargando, setCargando] = useState<boolean>(true)
    const [errorRed, setErrorRed] = useState<string | null>(null)
    const [busqueda, setBusqueda] = useState<string>('')

    useEffect(() => {
        obtenerRutinasGlobalesAsync()
            .then((datosDesdePostgres) => {
                setRutinas(datosDesdePostgres)
                setErrorRed(null)
            })
            .catch((error) => {
                console.error('Fallo en la comunicación HTTP con .NET:', error)
                setErrorRed('La comunicación fue rechazada o bloqueada por políticas de seguridad (CORS). Revisa la consola (F12).')
            })
            .finally(() => {
                setCargando(false)
            })
    }, [])

    const rutinasFiltradas = rutinas.filter((rutina) =>
        rutina.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-[#4A5D3E]">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#F4F1E1]">Catálogo Global de Rutinas</h1>
                    <p className="text-[#A3B18A] text-sm mt-1">
                        Conectado vía HTTP/CORS con <code className="text-[#8A9A5B] font-mono">PostgreSQL</code>.
                    </p>
                </div>
                <button className="bg-[#8A9A5B] hover:bg-[#A3B18A] text-[#242B1F] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
                    + Nueva Rutina Global
                </button>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="🔍 Filtrar rutinas provenientes de PostgreSQL..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full sm:max-w-md bg-[#242B1F] border border-[#4A5D3E] rounded-lg px-4 py-2.5 text-sm text-[#F4F1E1] placeholder-[#7A8A68] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                />
                <span className="text-xs text-[#A3B18A]">
          Mostrando <strong className="text-[#F4F1E1]">{rutinasFiltradas.length}</strong> de {rutinas.length} registros en BD
        </span>
            </div>

            {/* 1. Estado de Carga */}
            {cargando && (
                <div className="bg-[#4A5D3E]/50 border border-[#4A5D3E] rounded-xl p-12 text-center">
                    <p className="text-[#8A9A5B] font-semibold animate-pulse text-lg">
                        ⏳ Consultando endpoint GET /api/routines en .NET...
                    </p>
                </div>
            )}

            {/* 2. Estado de Error (CORS) */}
            {!cargando && errorRed && (
                <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-6 text-center">
                    <p className="text-red-400 font-bold text-base mb-1">🚨 Error de Comunicación Full-Stack</p>
                    <p className="text-[#F4F1E1] text-sm">{errorRed}</p>
                </div>
            )}

            {/* 3. Estado de Éxito */}
            {!cargando && !errorRed && (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rutinasFiltradas.map((rutina) => (
                        <RutinaGlobalCard key={rutina.id} id={rutina.id} nombre={rutina.nombre} />
                    ))}
                </section>
            )}
        </div>
    )
}