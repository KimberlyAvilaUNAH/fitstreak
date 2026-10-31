import './App.css'
import { RutinaGlobalCard } from './components/RutinaGlobalCard'

function App() {
    return (
        <main>
            <h1>Catálogo Global de Rutinas</h1>
            <p>Explora las rutinas disponibles para tu entrenamiento.</p>

            {/* Reutilización del componente inyectando Props */}
            <section className="routines-container">

                <RutinaGlobalCard id={1} nombre="Cardio 20 min" />
                <RutinaGlobalCard id={2} nombre="Fuerza: Tren Superior" />
                <RutinaGlobalCard id={3} nombre="Yoga y Flexibilidad" />

            </section>
        </main>
    )
}

export default App