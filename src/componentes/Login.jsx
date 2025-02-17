import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { loginSuccess } from '../redux/authSlice';
import {loginApi} from "../service/apiService.js"
import { useNavigate, NavLink, Navigate } from "react-router-dom";

const Login = ({ setIsRegistering, setIsLoggedIn }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [deshabilitado, setDeshabilitado] = useState(true);

  const [mensajeError, setMensajeError] = useState(undefined)

  const handleUsuarioChange = (e) => {
    const nuevoUsuario = e.target.value;
    setUsuario(nuevoUsuario);
    setDeshabilitado(nuevoUsuario.trim() === "" || password.trim() === "");
    setMensajeError(undefined)
  };

  const handlePasswordChange = (e) => {
    const nuevaPassword = e.target.value;
    setPassword(nuevaPassword);
    setDeshabilitado(usuario.trim() === "" || nuevaPassword.trim() === "");
    setMensajeError(undefined)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { "usuario": usuario, "password": password };
    console.log('data', data)

    try {
      const datos = await loginApi(data);
      console.log('datos.apiKey', datos.apiKey);
      let localStorage = window.localStorage;
      localStorage.setItem("apiKey", datos.apiKey);
      localStorage.setItem("id", datos.id);
      console.log("✅ Login exitoso!");
      dispatch(loginSuccess({ usuario, password, token: datos.token })); // Llama a la acción loginSuccess
      setIsLoggedIn(true); // Cambia el estado de isLoggedIn a true
      navigate("/dashboard");

    } catch (error) {
      console.log("❌ Error en la conexión", error);
      setMensajeError(error.message)

    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '22rem' }} className="p-4 shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={handleUsuarioChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Button id='botonLogin' variant="primary" type="submit" className="w-100" disabled={deshabilitado}>
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
        <Button variant="link" className="mt-3" onClick={() => setIsRegistering(true)}>¿No tienes cuenta? Regístrate</Button>

        {
          mensajeError && <p>Hubo un error: {mensajeError}</p>
        }

      </Card>
    </Container>
  );
};

export default Login;
