import React from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

const EvolucionPersonal = () => {
  const tiempoAyer = useSelector((state) => state.registros.tiempoAyer);
  const tiempoDiario = useSelector((state) => state.registros.tiempoDiario);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      
     
      {tiempoDiario > tiempoAyer && (
        <Card bg="success" text="white" style={{ width: '100%' }} className="mb-2">
          <Card.Body>
            <Card.Title>¡Bien hecho!</Card.Title>
            <Card.Text>
              Superaste el tiempo de actividades de ayer !! 
              Más tiempo, más esfuerzo, más cerca de tu mejor versión. 
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      
      {tiempoDiario < tiempoAyer && tiempoDiario > 0 && (
        <Card bg="warning" text="white" style={{ width: '100%' }} className="mb-2">
          <Card.Body>
            <Card.Title>¡Que no decaiga!</Card.Title>
            <Card.Text>
              No superaste el tiempo de actividades de ayer. 
              Cada esfuerzo suma, aunque hoy haya sido menos tiempo que ayer, sigues avanzando. ¡Tú puedes!
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      
      {tiempoDiario === 0 && (
        <Card bg="danger" text="white" style={{ width: '100%' }} className="mb-2">
          <Card.Body>
            <Card.Title>Es hora de entrenar!</Card.Title>
            <Card.Text>
              No registraste actividades hoy. 
              Un entrenamiento corto es mejor que no entrenar. ¡Hazlo!
            </Card.Text>
          </Card.Body>
        </Card>
      )}

    </div>
  );
}

export default EvolucionPersonal;
