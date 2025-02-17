import { useState } from 'react';
import './assets/estilos/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contenido from './componentes/Contenido';
import Dashboard from './componentes/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contenido" element={<Contenido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
