import { Route, Routes, useLocation } from 'react-router'
import { Forecast, Home } from './pages'
import './global.css'
import { AnimatePresence } from 'motion/react'

function App() {
    const location = useLocation();

    return (
        <div
            className=' text-white  min-h-screen min-w-screen px-10 py-10 select-none md:max-w-[1320px] md:min-w-auto mx-auto'
        >
            <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/forecast" element={<Forecast />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App