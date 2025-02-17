import React from 'react'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const InformeTiempo = () => {
  return (
    <>
        {/* Sección Informe de Tiempo */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tiempo total</Card.Title>
              <p>120 minutos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tiempo diario</Card.Title>
              <p>30 minutos</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
    </>
  )
}

export default InformeTiempo