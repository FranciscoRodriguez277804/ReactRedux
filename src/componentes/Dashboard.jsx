import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu.jsx";
import {obtenerActividades}  from "../service/apiService.js";
import { agregarRegistro } from "../service/apiService.js";
import Filtrado from "./Filtrado.jsx";
import InformeTiempo from "./InformeTiempo.jsx";


const Dashboard = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);

  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [tiempoIngresado, setTiempoIngresado] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(""); 


  useEffect(() => {
    comprobarLogin();
  }, []);

    useEffect(() => {
    const cargarActividades = async () => {
      try {
        const response = await obtenerActividades(); // Llamar a la API
        if (response.codigo === 200) {
          setActividades(response.actividades); // Guardar las actividades en el estado
        }
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    cargarActividades();
  }, []); 

  const comprobarLogin = () => {
    let localStorage = window.localStorage;
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey == undefined) {
      navigate("/Contenido");
    }
  };


  const handleGuardar = async () => {
    try {
        const idActividad = actividadSeleccionada;
        const tiempo = tiempoIngresado;
        const fecha = fechaSeleccionada;

        const response = await agregarRegistro(idActividad, tiempo, fecha);
        console.log("Registro exitoso:", response);
        location.reload();

    } catch (error) {
        console.error("Error al registrar actividad:", error);
    }
};
  return (
    <Container>
      <Menu />

      {/* Sección Agregar Registro */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Agregar un registro</Card.Title>
              <Form>
                {/* Select de Actividad */}
                <Form.Group>
                  <Form.Label>Actividad</Form.Label>
                  <Form.Control
                    as="select"
                    value={actividadSeleccionada}
                    onChange={(e) => setActividadSeleccionada(e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    {actividades.map((actividad) => (
                      <option key={actividad.id} value={actividad.id} >
                        {actividad.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* Input de Tiempo */}
                <Form.Group>
                  <Form.Label>Tiempo (minutos)</Form.Label>
                  <Form.Control type="number" value={tiempoIngresado} onChange={(e) => setTiempoIngresado(e.target.value)} placeholder="Ingrese el tiempo" />
                </Form.Group>

                {/* Input de Fecha */}
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" value={fechaSeleccionada} onChange={(e) => setFechaSeleccionada(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" className="mt-3" onClick={handleGuardar}>Guardar</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div><Filtrado/></div>
      <div><InformeTiempo/></div>
    </Container>
  );
};

export default Dashboard;