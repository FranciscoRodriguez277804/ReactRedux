import React, { useEffect, useState } from "react";
import Grafica from './Grafica'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import Menu from "./Menu";
import { cargarRegistros , cargarActividades } from '../redux/registrosSlice'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";


const MiComponente = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { comprobarLogin } = useAuth();
    

    const registros = useSelector((state) => state.registros.lista);
    const actividades = useSelector((state) => state.registros.actividades) || [];

    const tiempos = registros.map(registro => registro.tiempo);
    const nombreActividades = actividades.map(actividad => actividad.nombre);

    console.log('tiempos', tiempos)
    console.log('nombreActividades', nombreActividades)


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