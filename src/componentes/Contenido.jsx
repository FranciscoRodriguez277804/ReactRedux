import React, { useState } from 'react';
import Login from './Login';
import Registro from './Registro';
import Dashboard from './Dashboard';

const Contenido = () => {
  const [isRegistering, setIsRegistering] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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