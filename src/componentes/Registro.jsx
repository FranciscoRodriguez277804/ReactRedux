import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {registrarUsuario}  from "../service/apiService.js"
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Registro = ({ setIsRegistering, setIsLoggedIn }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [pais, setPais] = useState("");
    const [deshabilitado, setDeshabilitado] = useState(true);

    useEffect(() => {
        setDeshabilitado(!(usuario.trim() && password.trim() && pais.trim()));
    }, [usuario, password, pais]);

    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePaisChange = (e) => setPais(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { usuario, password, pais };
        try {
            const datos =  await registrarUsuario(data);
            let localStorage = window.localStorage;
            localStorage.setItem("apiKey", datos.apiKey);
            localStorage.setItem("id", datos.id);
            localStorage.setItem("usuario", usuario)
            dispatch(loginSuccess({ usuario, password, token: datos.token }));
            setIsLoggedIn(true); // Cambia el estado de isLoggedIn a true
            navigate("/dashboard");

        } catch (error) {
            toast.error("Error al registrar el usuario");
        
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '22rem' }} className="p-4 shadow-lg">
                <Card.Body>
                    <h2 className="text-center mb-4">Registro</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGroupUsuario">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingresa tu usuario"
                                value={usuario}
                                onChange={handleUsuarioChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPais">
                            <Form.Label>País</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingresa tu país"
                                value={pais}
                                onChange={handlePaisChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" disabled={deshabilitado}>
                            Registrarse
                        </Button>
                    </Form>
                    <p className="mt-3 text-center">
                        <Button variant="link" onClick={() => setIsRegistering(false)}>¿Ya tienes cuenta? Inicia sesión</Button>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Registro;
