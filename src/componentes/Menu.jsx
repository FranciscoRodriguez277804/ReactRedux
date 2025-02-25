import React, { useState } from "react";
import { Container, Nav, Navbar, Toast, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { resetearEstado } from '../redux/registrosSlice';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Menu = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    setShowToast(true); // Muestra el Toast 
  };

  const confirmarCerrarSesion = () => {

    localStorage.removeItem("apiKey"); 
    localStorage.removeItem("usuario"); 
    localStorage.removeItem("idUsuario"); 
    setShowToast(false); // Cierra el Toast
    dispatch(resetearEstado());
    navigate("/Contenido"); 
    toast('Cerraste la sesion!', {
    });

  };

  const cancelarCerrarSesion = () => {
    setShowToast(false); // Cierra el Toast 
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Hola {usuario}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/MiComponente">Análisis</Nav.Link>
            <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
            position: "fixed",
            top: "10px",
            left: "50%", 
            transform: "translateX(-50%)", 
            zIndex: 1,
        }}
      >
        <Toast.Body>
          <div>¿Estás seguro de cerrar sesión?</div>
          <Button variant="light" size="sm" onClick={confirmarCerrarSesion} style={{ marginRight: "10px" }}>
            Sí
          </Button>
          <Button variant="light" size="sm" onClick={cancelarCerrarSesion}>
            No
          </Button>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Menu;
