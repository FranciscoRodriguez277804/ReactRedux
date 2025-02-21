import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Registro = ({ setIsRegistering , setIsLoggedIn}) => {
    
    const dispatch = useDispatch();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [pais, setPais] = useState("");
    const [deshabilitado, setDeshabilitado] = useState(true);


    // Verifica si todos los campos están completos
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
            const response = await fetch("https://movetrack.develotion.com/usuarios.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                console.log("✅ Registro exitoso!");
                // Auto login después del registro
                dispatch(loginSuccess({ usuario, token: result.token }));
                setIsLoggedIn(true);
            } else {
                console.log("❌" + result.message);
            }
        } catch (error) {
            console.log("❌ Error en la conexión");
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
