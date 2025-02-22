import React, { useEffect, useState } from "react";
import Grafica from './Grafica'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import Menu from "./Menu";
import { cargarRegistros, cargarActividades } from '../redux/registrosSlice'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";


const MiComponente = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { comprobarLogin } = useAuth();


    const registros = useSelector((state) => state.registros.lista);
    const actividades = useSelector((state) => state.registros.actividades);

    
    const registrosFiltrados = registros.filter(registro => registro.tiempo > 0);

   
    const actividadesTotales = registrosFiltrados.reduce((acc, registro) => {
        const { idActividad, tiempo } = registro;

        if (!acc[idActividad]) {
            acc[idActividad] = { tiempoTotal: 0 };
        }

        acc[idActividad].tiempoTotal += tiempo;
        return acc;
    }, {});

    
    const nombreActividades = [];
    const tiempos = [];

    actividades.forEach(actividad => {
        if (actividadesTotales[actividad.id]) {
            nombreActividades.push(actividad.nombre);
            tiempos.push(actividadesTotales[actividad.id].tiempoTotal);
        }
    });



    useEffect(() => {

        comprobarLogin();
        dispatch(cargarRegistros());
        dispatch(cargarActividades());

    }, [dispatch])


    return (

        <Container>

            <>
                <Menu />
                <Grafica etiquetas={nombreActividades} datos={tiempos}></Grafica>

            </>



        </Container>


    )
}

export default MiComponente