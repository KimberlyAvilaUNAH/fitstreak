//import './App.css'
// src/App.tsx
import { AppLayout } from './Layouts/AppLayout'
import { CatalogoRutinasView } from './Features/Rutinas/Components/CatalogoRutinasView'

function App() {
    return (
        <AppLayout>
            <CatalogoRutinasView />
        </AppLayout>
    )
}

export default App