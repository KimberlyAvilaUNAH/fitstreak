// src/features/rutinas/components/CatalogoRutinasView.tsx
import { useState, useEffect } from 'react'
import type { RutinaGlobal } from '../Types/Rutina.types'
import { obtenerRutinasGlobalesAsync } from '../API/RutinasAPI'
import { RutinaGlobalCard } from './RutinaGlobalCard'

export function CatalogoRutinasView() {
    // --- ZONA 3: CEREBRO DEL MÓDULO ---
    const [rutinas, setRutinas] = useState<RutinaGlobal[]>([])
    const [cargando, setCargando] = useState<boolean>(true)
    const [busqueda, setBusqueda] = useState<string>('')

    useEffect(() => {
        // Consumimos nuestra capa de servicio (api/rutinasApi.ts)
        obtenerRutinasGlobalesAsync().then((datos) => {
            setRutinas(datos)
            setCargando(false)
        })
    }, [])

    const rutinasFiltradas = rutinas.filter((rutina) =>
        rutina.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    // --- ZONA 4: RENDERIZADO EXCLUSIVO DEL CATÁLOGO ---
    return (
        <div>
            {/* Barra Superior de Título y Acción Principal */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-[#4A5D3E]">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#F4F1E1]">Catálogo Global de Rutinas</h1>
                    <p className="text-[#A3B18A] text-sm mt-1">
                        Módulo desacoplado bajo arquitectura <code className="text-[#8A9A5B] font-mono">Vertical Slicing</code>.
                    </p>
                </div>

                <button className="bg-[#8A9A5B] hover:bg-[#A3B18A] text-[#242B1F] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
                    + Nueva Rutina Global
                </button>
            </div>

            {/* Buscador Reactivo */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="🔍 Filtrar rutinas en el catálogo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full sm:max-w-md bg-[#242B1F] border border-[#4A5D3E] rounded-lg px-4 py-2.5 text-sm text-[#F4F1E1] placeholder-[#7A8A68] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                />
                <span className="text-xs text-[#A3B18A]">
          Mostrando <strong className="text-[#F4F1E1]">{rutinasFiltradas.length}</strong> de {rutinas.length} registros
        </span>
            </div>

            {/* Renderizado Condicional y Rejilla */}
            {cargando ? (
                <div className="bg-[#4A5D3E]/50 border border-[#4A5D3E] rounded-xl p-12 text-center">
                    <p className="text-[#8A9A5B] font-semibold animate-pulse text-lg">
                        ⏳ Consultando capa de servicios (rutinasApi.ts)...
                    </p>
                </div>
            ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rutinasFiltradas.map((rutina) => (
                        <RutinaGlobalCard
                            key={rutina.id}
                            id={rutina.id}
                            nombre={rutina.nombre}
                        />
                    ))}
                </section>
            )}
        </div>
    )
}