import { useState } from 'react';
import './assets/estilos/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contenido from './componentes/Contenido';
import Dashboard from './componentes/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MiComponente from './componentes/MiComponente';
import GraficaMinutosPorActividad from './componentes/GraficaMinutosPorActividad';
import Grafica from './componentes/Grafica'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/MiComponente" element={<MiComponente />} />
        <Route path="/GraficaMinutosPorActividad" element={<GraficaMinutosPorActividad />} />
        <Route path="/Grafica" element={<Grafica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
