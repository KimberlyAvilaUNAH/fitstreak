// src/components/RutinaGlobalCard.tsx

// --- ZONA 1: EL CONTRATO (INTERFAZ EXPORTADA) ---
// Espejo exacto de nuestra tabla RoutinesGlobales en PostgreSQL
export interface RutinaGlobalProps {
    id: number;
    nombre: string;
}

// --- ZONA 2: LA FIRMA ---
export function RutinaGlobalCard({ id, nombre }: RutinaGlobalProps) {

    // --- ZONA 3: EL CEREBRO (LÓGICA) ---
    // (Componente presentacional puro)

    // --- ZONA 4: EL RENDERIZADO (APLICANDO DESIGN TOKENS VERDE/CREMA) ---
    return (
        <article className="bg-[#4A5D3E] border border-[#5C704E] rounded-xl p-5 flex flex-col justify-between hover:border-[#A3B18A] transition-colors shadow-lg">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#3B4A32] text-[#D4C9A8] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#5C704E]">
                        ID Catálogo #{id}
                    </span>
                    <span className="text-xs text-[#B4BFA5] font-medium">Catálogo Base</span>
                </div>

                <h3 className="text-lg font-bold text-[#F4F1E1] mb-5">
                    {nombre}
                </h3>
            </div>

            <button
                disabled
                className="w-full bg-[#38442F] text-[#A3B18A] text-sm font-medium py-2.5 px-4 rounded-lg cursor-not-allowed border border-[#4A5D3E]"
            >
                🔒 Completar Rutina (Requiere Sesión)
            </button>
        </article>
    );
}