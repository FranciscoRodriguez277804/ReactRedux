import React, { useState } from 'react';
import Login from './Login';
import Registro from './Registro';
import Dashboard from './Dashboard';

const Contenido = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Estado para cambiar entre Login y Registro
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para rastrear si el usuario ha iniciado sesión

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        isRegistering ? (
          <Registro setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} />
        )
      )}
    </div>
  );
};

export default Contenido;