import React, { useState } from "react";
import { Container, Nav, Navbar, Toast, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Menu = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");
  const [showToast, setShowToast] = useState(false);

  const handleLogout = () => {
    setShowToast(true); // Muestra el Toast cuando se hace clic en "Cerrar sesión"
  };

  const confirmarCerrarSesion = () => {
    localStorage.removeItem("apiKey"); // Elimina la sesión
    localStorage.removeItem("usuario"); // Elimina el usuario
    localStorage.removeItem("idUsuario"); // Elimina el id del usuario
    setShowToast(false); // Cierra el Toast
    navigate("/Contenido"); // Redirige al usuario
  };

  const cancelarCerrarSesion = () => {
    setShowToast(false); // Cierra el Toast si el usuario decide cancelar
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Hola {usuario}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/MiComponente">Gráficas</Nav.Link>
            <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Toast de confirmación */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
            position: "fixed",
            top: "10px", // Coloca el Toast cerca de la parte superior
            left: "50%", // Centrado en el eje horizontal
            transform: "translateX(-50%)", // Ajuste para centrarlo completamente
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
