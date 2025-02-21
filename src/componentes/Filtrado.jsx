import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { cargarRegistros, eliminarRegistroAsync, agregarRegistroAsync } from "../redux/registrosSlice";


const Filtrado = () => {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.registros.lista);
  const [filtro, setFiltro] = useState("ultimaSemana");


  useEffect(() => {
    dispatch(cargarRegistros());
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
    dispatch(eliminarRegistroAsync(idRegistro));
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
            <ul className="mt-3">
              {registrosFiltrados.length > 0 ? (
                registrosFiltrados.map((registro) => (
                    <li key={registro.id}>
                    {registro.idActividad} - {registro.tiempo} min - {registro.fecha}
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleEliminar(registro.id)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))
              ) : (
                <p>No hay registros disponibles.</p>
              )}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Filtrado;
