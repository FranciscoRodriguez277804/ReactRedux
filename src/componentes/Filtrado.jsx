import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { cargarRegistros, eliminarRegistroAsync, agregarRegistroAsync , cargarActividades } from "../redux/registrosSlice";
import ListGroup from 'react-bootstrap/ListGroup';
import toast from "react-hot-toast";


const Filtrado = () => {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.registros.lista);
  const [filtro, setFiltro] = useState("ultimaSemana");
  const actividades = useSelector((state) => state.registros.actividades);

  useEffect(() => {
    dispatch(cargarRegistros());
    dispatch(cargarActividades());
  }, [dispatch]);

  const filtrarPorFecha = (registros, filtro) => {
    const hoy = moment();
    let fechaInicio;

    if (filtro === "ultimaSemana") {
      fechaInicio = hoy.clone().subtract(7, "days");
    } else if (filtro === "ultimoMes") {
      fechaInicio = hoy.clone().subtract(1, "months");
    } else {
      return registros;
    }

    return registros.filter((registro) => {
      const fechaRegistro = moment(registro.fecha, "YYYY-MM-DD");
      return fechaRegistro.isSameOrAfter(fechaInicio, "day");
    });
  };

  const handleEliminar = (idRegistro) => {
    toast.success('Actividad eliminada con exito!')
    dispatch(eliminarRegistroAsync(idRegistro));
    
  };

    // Función para obtener la imagen de la actividad
    const obtenerImagenActividad = (idActividad) => {
      const actividad = actividades.find(a => a.id === idActividad);
      return actividad ? `https://movetrack.develotion.com/imgs/${actividad.imagen}.png` : '';
    };


  const registrosFiltrados = filtrarPorFecha(registros, filtro);

    return (
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Listado de registros</Card.Title>
              <Form.Group>
                <Form.Label>Filtrar por fecha</Form.Label>
                <Form.Control as="select" onChange={(e) => setFiltro(e.target.value)} value={filtro}>
                  <option value="ultimaSemana">Última semana</option>
                  <option value="ultimoMes">Último mes</option>
                  <option value="todo">Todo el histórico</option>
                </Form.Control>
              </Form.Group>
              <ListGroup className="mt-3">
                {registrosFiltrados.length > 0 ? (
                  registrosFiltrados.map((registro) => {
                    const imagenActividad = obtenerImagenActividad(registro.idActividad);
                    return (
                      <ListGroup.Item key={registro.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {imagenActividad && (
                            <img 
                              src={imagenActividad} 
                              alt={`Actividad ${registro.idActividad}`} 
                              style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} 
                            />
                          )}
                          <span> {registro.tiempo} min - {registro.fecha}</span>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleEliminar(registro.id)}
                        >
                          Eliminar
                        </Button>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <ListGroup.Item>No hay registros disponibles.</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

export default Filtrado;
