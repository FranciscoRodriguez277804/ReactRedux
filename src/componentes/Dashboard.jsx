import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Menu from "./Menu.jsx";
import { obtenerActividades } from "../service/apiService.js";
import { agregarRegistro } from "../service/apiService.js";
import { cargarRegistros } from "../redux/registrosSlice";
import Filtrado from "./Filtrado.jsx";
import InformeTiempo from "./InformeTiempo.jsx";
import moment from "moment";
import toast from "react-hot-toast";



const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        const response = await obtenerActividades();
        if (response.codigo === 200) {
          setActividades(response.actividades); // Guardar las actividades en el estado
        }
      } catch (error) {

      }
    };
    cargarActividades();
  }, []);

  useEffect(() => {
    dispatch(cargarRegistros());
  }, [dispatch]);

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
        const tiempo = Number(tiempoIngresado); 
        const fecha = fechaSeleccionada;
        const hoy = moment().startOf('day'); 
        const time = moment(fechaSeleccionada, "YYYY-MM-DD"); 

        // Validaciones previas
        if (tiempo <= 0 || isNaN(tiempo)) {
            return toast.error("Error: No se puede ingresar un tiempo negativo o cero.");
        }

        if (time.isAfter(hoy)) {
            return toast.error("Error: La fecha ingresada no puede ser un día posterior a hoy.");
        }

        // Uso de toast.promise para manejar la solicitud asíncrona
        await toast.promise(
            agregarRegistro(idActividad, tiempo, fecha),
            {
                loading: "Guardando registro...",
                success: "Registro agregado exitosamente",
                error: "Error: No se pudo agregar el registro",
            }
        );

        // Si la promesa se resuelve correctamente, cargamos los registros
        dispatch(cargarRegistros());

    } catch (error) {
        toast.error("Error: No se pudo agregar el registro");
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
                  <Form.Control type="date" value={fechaSeleccionada} onChange={(e) => setFechaSeleccionada(e.target.value)} />
                </Form.Group>

                <Button variant="primary" className="mt-3" onClick={handleGuardar}>Guardar</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div><Filtrado /></div>
      <div><InformeTiempo /></div>
    </Container>
  );
};

export default Dashboard;