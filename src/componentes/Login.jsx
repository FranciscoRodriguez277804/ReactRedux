import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { loginSuccess } from '../redux/authSlice';
import { loginApi } from "../service/apiService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setIsRegistering, setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [deshabilitado, setDeshabilitado] = useState(true);

  const handleUsuarioChange = (e) => {
    const nuevoUsuario = e.target.value;
    setUsuario(nuevoUsuario);
    setDeshabilitado(nuevoUsuario.trim() === "" || password.trim() === "");
  };

  const handlePasswordChange = (e) => {
    const nuevaPassword = e.target.value;
    setPassword(nuevaPassword);
    setDeshabilitado(usuario.trim() === "" || nuevaPassword.trim() === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { usuario, password };

    try {
      const datos = await loginApi(data);
      localStorage.setItem("apiKey", datos.apiKey);
      localStorage.setItem("id", datos.id);
      localStorage.setItem("usuario", usuario);
      dispatch(loginSuccess({ usuario, password, token: datos.token })); 
      setIsLoggedIn(true);
      navigate("/dashboard");
      toast(`Bienvenido ${data.usuario}`, {
        icon: '👋',
      });
        
    } catch (error) {
      toast.error("No se pudo iniciar sesión");
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

        <Button variant="link" className="mt-3" onClick={() => setIsRegistering(true)}>
          ¿No tienes cuenta? Regístrate
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
