//import './App.css'
// src/App.tsx
import { useState, useEffect } from 'react'
import { RutinaGlobalCard, type RutinaGlobalProps } from './components/RutinaGlobalCard'

function App() {
    // =========================================================================
    // ZONA 3: EL CEREBRO DEL COMPONENTE (CONEXIÓN AL ALMACÉN GLOBAL DE REACT)
    // =========================================================================

    // 1. Almacén para el catálogo de rutinas
    const [rutinas, setRutinas] = useState<RutinaGlobalProps[]>([])

    // 2. Almacén para el estado de carga (UI)
    const [cargando, setCargando] = useState<boolean>(true)

    // 3. Almacén para el buscador en vivo
    const [busqueda, setBusqueda] = useState<string>('')

    // 4. Hook de Ciclo de Vida (useEffect con [] se ejecuta UNA SOLA VEZ tras el primer render)
    useEffect(() => {
        // Simulamos la latencia de red (1.2 seg) de una consulta al servidor
        const temporizador = setTimeout(() => {
            const datosSimuladosBD: RutinaGlobalProps[] = [
                { id: 1, nombre: 'Cardio: 20 minutos de trote continuo' },
                { id: 2, nombre: 'Fuerza: Tren superior (Pecho y Espalda)' },
                { id: 3, nombre: 'Yoga y Flexibilidad matutina' },
                { id: 4, nombre: 'HIIT: 15 minutos de alta intensidad' },
                { id: 5, nombre: 'Fuerza: Tren inferior (Piernas y Pantorrillas)' },
                { id: 6, nombre: 'Estiramientos y recuperación muscular' },
            ]

            // Llenamos el almacén global (Vuelta 2)
            setRutinas(datosSimuladosBD)
            setCargando(false)
        }, 1200)

        // Limpieza de memoria si el componente se desmonta antes de que termine
        return () => clearTimeout(temporizador)
    }, [])

    // Variable calculada que filtra en tiempo real según la búsqueda
    const rutinasFiltradas = rutinas.filter((rutina) =>
        rutina.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    // =========================================================================
    // ZONA 4: EL RENDERIZADO DECLARATIVO (UI)
    // =========================================================================
    return (
        <div className="min-h-screen bg-[#2E3628] text-[#F4F1E1] flex flex-col font-sans">

            {/* HEADER (Mantenemos tu diseño horizontal) */}
            <header className="bg-[#242B1F] border-b border-[#4A5D3E] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#8A9A5B] flex items-center justify-center font-bold text-[#242B1F] shadow-sm">FS</div>
                        <span className="text-xl font-bold tracking-tight text-[#F4F1E1]">FitStreak</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-1">
                        <a href="#" className="px-3 py-2 text-sm font-medium bg-[#38442F] text-[#D4C9A8] rounded-md transition-colors flex items-center gap-2">
                            🌐 Catálogo Global
                            {/* El contador reacciona al useState */}
                            <span className="bg-[#4A5D3E] text-[#F4F1E1] text-xs px-2 py-0.5 rounded-full">
                {rutinas.length}
              </span>
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
            <span className="text-xs bg-[#5C4A2E] text-[#E8D5A5] px-3 py-1.5 rounded-md border border-[#8A6D3B] font-medium shadow-sm">
              👤 Modo Invitado
            </span>
                    </div>
                </div>
            </header>

            {/* ÁREA CENTRAL */}
            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-[#4A5D3E]">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#F4F1E1]">Catálogo Global de Rutinas</h1>
                        <p className="text-[#A3B18A] text-sm mt-1">
                            Explora las rutinas maestras registradas en la base de datos.
                        </p>
                    </div>
                    <button className="bg-[#8A9A5B] hover:bg-[#A3B18A] text-[#242B1F] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
                        + Nueva Rutina Global
                    </button>
                </div>

                {/* BUSCADOR REACTIVO */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="🔍 Filtrar rutinas en el catálogo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full sm:max-w-md bg-[#242B1F] border border-[#4A5D3E] rounded-lg px-4 py-2.5 text-sm text-[#F4F1E1] placeholder-[#7A8A68] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                    />
                    <span className="text-xs text-[#A3B18A]">
            Mostrando <strong className="text-[#F4F1E1]">{rutinasFiltradas.length}</strong> de {rutinas.length} registros en memoria
          </span>
                </div>

                {/* RENDERIZADO CONDICIONAL: Cargando (Vuelta 1) vs Datos (Vuelta 2) */}
                {cargando ? (
                    <div className="bg-[#4A5D3E]/50 border border-[#4A5D3E] rounded-xl p-12 text-center">
                        <p className="text-[#8A9A5B] font-semibold animate-pulse text-lg">
                            ⏳ Sincronizando catálogo desde el Almacén de Estado...
                        </p>
                        <p className="text-[#7A8A68] text-xs mt-2">
                            Ejecutando Vuelta 1 (Montaje inicial y disparo de useEffect)
                        </p>
                    </div>
                ) : (
                    /* MAPEO DINÁMICO AL DOM */
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rutinasFiltradas.length === 0 ? (
                            <p className="text-[#A3B18A] col-span-full text-center py-10">No se encontraron rutinas que coincidan con tu búsqueda.</p>
                        ) : (
                            rutinasFiltradas.map((rutina) => (
                                <RutinaGlobalCard
                                    key={rutina.id}
                                    id={rutina.id}
                                    nombre={rutina.nombre}
                                />
                            ))
                        )}
                    </section>
                )}

            </main>
        </div>
    )
}

export default App