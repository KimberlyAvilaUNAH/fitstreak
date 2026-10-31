//import './App.css'
// src/App.tsx
import { RutinaGlobalCard } from './components/RutinaGlobalCard'

function App() {
    return (
        <div className="min-h-screen bg-[#2E3628] text-[#F4F1E1] flex flex-col font-sans">

            {/* =====================================================================
          BARRA SUPERIOR HORIZONTAL (Reemplaza al Sidebar)
         ===================================================================== */}
            <header className="bg-[#242B1F] border-b border-[#4A5D3E] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                    {/* Izquierda: Logo y Marca */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#8A9A5B] flex items-center justify-center font-bold text-[#242B1F] shadow-sm">
                            FS
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#F4F1E1]">FitStreak</span>
                    </div>

                    {/* Centro: Navegación Horizontal */}
                    <nav className="hidden md:flex items-center gap-1">
                        <a href="#" className="px-3 py-2 text-sm font-medium bg-[#38442F] text-[#D4C9A8] rounded-md transition-colors">
                            🌐 Catálogo Global
                        </a>
                        <a href="#" className="px-3 py-2 text-sm font-medium text-[#A3B18A] hover:bg-[#38442F] hover:text-[#F4F1E1] rounded-md transition-colors cursor-not-allowed">
                            📈 Mis Rutinas
                        </a>
                        <a href="#" className="px-3 py-2 text-sm font-medium text-[#A3B18A] hover:bg-[#38442F] hover:text-[#F4F1E1] rounded-md transition-colors cursor-not-allowed">
                            📊 Progreso
                        </a>
                    </nav>

                    {/* Derecha: Estado de Sesión */}
                    <div className="flex items-center gap-4">
            <span className="text-xs bg-[#5C4A2E] text-[#E8D5A5] px-3 py-1.5 rounded-md border border-[#8A6D3B] font-medium shadow-sm">
              👤 Modo Invitado
            </span>
                    </div>

                </div>
            </header>

            {/* =====================================================================
          ÁREA CENTRAL DE CONTENIDO (WORKSPACE)
         ===================================================================== */}
            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

                {/* Barra Superior de Título y Acción */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-[#4A5D3E]">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#F4F1E1]">Catálogo Global de Rutinas</h1>
                        <p className="text-[#A3B18A] text-sm mt-1">
                            Explora las rutinas maestras registradas en la base de datos.
                        </p>
                    </div>

                    {/* Botón de Acción Principal */}
                    <button className="bg-[#8A9A5B] hover:bg-[#A3B18A] text-[#242B1F] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
                        + Nueva Rutina Global
                    </button>
                </div>

                {/* REJILLA RESPONSIVA DE TARJETAS */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <RutinaGlobalCard id={1} nombre="Cardio 20 min" />
                    <RutinaGlobalCard id={2} nombre="Fuerza: Tren Superior" />
                    <RutinaGlobalCard id={3} nombre="Yoga y Flexibilidad" />
                </section>

            </main>
        </div>
    )
}

export default App