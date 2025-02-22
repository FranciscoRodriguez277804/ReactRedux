import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { cargarRegistros } from '../redux/registrosSlice';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";



const InformeTiempo = () => {

  const dispatch = useDispatch();
  const registros = useSelector((state) => state.registros.lista);
  const [tiempoTotal, setTiempoTotal] = useState(0);
  const [tiempoDiario, setTiempoDiario] = useState(0);
  const isAuthenticated = localStorage.getItem("apiKey")

  useEffect(() => {
    if (isAuthenticated) {
      // Solo cargar registros si el usuario está autenticado
      dispatch(cargarRegistros());
    } else {
      // Si no está autenticado, restablecer el tiempo total a 0
      setTiempoTotal(0);
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      // Calcular el tiempo total solo si el usuario está autenticado
      const total = registros.reduce((acumulador, registro) => acumulador + registro.tiempo, 0);
      setTiempoTotal(total); // Actualizar el estado con el tiempo total



    }
  }, [registros, isAuthenticated]); // Se ejecuta cuando 'registros' o 'isAuthenticated' cambian

  useEffect(() => {
    if (isAuthenticated) {
      // Filtrar registros que correspondan a la fecha actual
      const tiempoDiario = registros.reduce((acumulador, registro) => {
        const fechaRegistro = moment(registro.fecha); // Convertir la fecha del registro
        const fechaActual = moment().startOf("day"); // Fecha de hoy sin horas

        return fechaRegistro.isSame(fechaActual, "day")
          ? acumulador + registro.tiempo // Sumar solo si es la fecha actual
          : acumulador;
      }, 0);

      setTiempoDiario(tiempoDiario); // Actualizar el estado con el tiempo total filtrado
    }
  }, [registros, isAuthenticated]);


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
  )
}

export default InformeTiempo