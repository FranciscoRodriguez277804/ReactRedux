import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Menu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const usuario = localStorage.getItem("usuario")

    const handleLogout = () => {
        localStorage.getItem("apiKey");
        localStorage.removeItem("apiKey");
        localStorage.clear();

        navigate("/Contenido");
    }
    
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Hola {usuario}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/MiComponente">Grafica</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Cerrar Seccion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Menu