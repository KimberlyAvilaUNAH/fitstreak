// src/layouts/AppLayout.tsx
import type { ReactNode } from 'react'

interface AppLayoutProps {
    children: ReactNode; // Representa la vista que se inyectará en el área de trabajo central
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-[#2E3628] text-[#F4F1E1] flex flex-col font-sans">

            {/* HEADER HORIZONTAL */}
            <header className="bg-[#242B1F] border-b border-[#4A5D3E] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#8A9A5B] flex items-center justify-center font-bold text-[#242B1F] shadow-sm">FS</div>
                        <span className="text-xl font-bold tracking-tight text-[#F4F1E1]">FitStreak</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        <a href="#" className="px-3 py-2 text-sm font-medium bg-[#38442F] text-[#D4C9A8] rounded-md transition-colors">
                            🌐 Catálogo Global
                        </a>
                        <a href="#" className="px-3 py-2 text-sm font-medium text-[#A3B18A] hover:bg-[#38442F] hover:text-[#F4F1E1] rounded-md transition-colors cursor-not-allowed">
                            📈 Mis Rutinas
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
            <span className="text-xs bg-[#5C4A2E] text-[#E8D5A5] px-3 py-1.5 rounded-md border border-[#8A6D3B] font-medium shadow-sm">
              👤 Modo Invitado
            </span>
                    </div>

                </div>
            </header>

            {/* ÁREA CENTRAL DE CONTENIDO (Aquí se inyecta la vista hija) */}
            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    )
}