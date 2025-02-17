import React from 'react'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import moment from 'moment';
import { obtenerRegistros } from "../service/apiService.js";
import  { useState, useEffect } from 'react';


const Filtrado = () => {
    
    const [registros, setRegistros] = useState([]); // Datos originales
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]); // Datos filtrados
    const [filtro, setFiltro] = useState("ultimaSemana"); // Filtro seleccionado

    useEffect(() => {
        const cargarRegistros = async () => {
            try {
                const data = await obtenerRegistros();
    
                if (!data) {
                    console.error("Error: No se obtuvo respuesta de la API.");
                    return;
                }
    
                if (data.codigo !== 200) {
                    console.error("Error en la respuesta de la API:", data.mensaje || "Mensaje no disponible");
                    return;
                }
    
                if (Array.isArray(data.registros)) {
                    setRegistros(data.registros); // ✅ Guarda los registros
                    setRegistrosFiltrados(filtrarPorFecha(data.registros, filtro)); 
                } else {
                    console.error("Error en la estructura de la respuesta:", data);
                }
            } catch (error) {
                console.error("Error al obtener registros:", error);
            }
        };
    
        cargarRegistros();
    }, []); // Se ejecuta solo una vez al montar el componente

    useEffect(() => {
        setRegistrosFiltrados(filtrarPorFecha(registros, filtro));
    }, [filtro, registros]); // Se actualiza cuando cambia el filtro o los registros

    const filtrarPorFecha = (registros, filtro) => {
        const hoy = moment();
        let fechaInicio;

        if (filtro === "ultimaSemana") {
            fechaInicio = hoy.clone().subtract(7, "days");
        } else if (filtro === "ultimoMes") {
            fechaInicio = hoy.clone().subtract(1, "months");
        } else {
            return registros; // Devuelve todo el histórico
        }

        return registros.filter(registro => {
            const fechaRegistro = moment(registro.fecha, "YYYY-MM-DD");
            return fechaRegistro.isSameOrAfter(fechaInicio, "day");
        });
    };
  
  
  
    return (
    <>  
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Listado de registros</Card.Title>
                <Form.Group>
                  <Form.Label>Filtrar por fecha</Form.Label>
                  <Form.Control as="select" onChange={(e) => setFiltro(e.target.value)} value={filtro}>
                    <option value={"ultimaSemana"}>Última semana</option>
                    <option value={"ultimoMes"}>Último mes</option>
                    <option value={"todo"}>Todo el histórico</option>
                  </Form.Control>
                </Form.Group>
                <ul className="mt-3">
                {registrosFiltrados.length > 0 ? (
                    registrosFiltrados.map(registro => (
                        <li key={registro.id}>
                            {registro.idActividad} - {registro.tiempo} min - {registro.fecha}
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
      
    </>
  );
};

export default Filtrado;