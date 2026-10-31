// src/components/RutinaGlobalCard.tsx

// --- ZONA 1: EL CONTRATO (INTERFAZ) ---
interface RutinaGlobalProps {
    id: number;
    nombre: string;
}

// --- ZONA 2: LA FIRMA (EXPORTACIÓN NOMBRADA) ---
export function RutinaGlobalCard({ id, nombre }: RutinaGlobalProps) {

    // --- ZONA 3: EL CEREBRO (LÓGICA) ---
    // Vacío por ahora.

    // --- ZONA 4: EL RENDERIZADO (JSX) ---
    return (
        <article
            className="routine-card"
            style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', borderRadius: '8px' }}
        >
            <small style={{ color: 'gray' }}>ID Catálogo: {id}</small>
            <h3>{nombre}</h3>

            <button disabled style={{ cursor: 'not-allowed' }}>
                Completar Rutina (Próximamente)
            </button>
        </article>
    );
}