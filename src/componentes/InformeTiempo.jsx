import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { cargarRegistros, actualizarTiempoDiario, actualizarTiempoAyer } from '../redux/registrosSlice';
import { useDispatch, useSelector } from "react-redux";

const InformeTiempo = () => {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.registros.lista);
  const tiempoTotal = registros.reduce((acumulador, registro) => acumulador + registro.tiempo, 0); // Calcular el tiempo total
  const tiempoDiario = useSelector((state) => state.registros.tiempoDiario); // Obtener tiempoDiario global
  const tiempoAyer = useSelector((state) => state.registros.tiempoAyer); // Obtener tiempoAyer global
  const isAuthenticated = localStorage.getItem("apiKey");

  useEffect(() => {
    if (isAuthenticated) {
      // Solo cargar registros si el usuario está autenticado
      dispatch(cargarRegistros());
    } else {
      // Si no está autenticado, restablecer el tiempo total a 0
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && registros.length > 0) {
      dispatch(actualizarTiempoDiario()); // Actualizar el tiempoDiario en Redux
      dispatch(actualizarTiempoAyer());   // Actualizar el tiempoAyer en Redux
    }
  }, [dispatch, registros, isAuthenticated]);

  return (
    <>
      {/* Sección Informe de Tiempo */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tiempo total</Card.Title>
              <p>{tiempoTotal}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tiempo diario</Card.Title>
              <p>{tiempoDiario}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InformeTiempo;
