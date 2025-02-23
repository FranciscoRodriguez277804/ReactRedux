import React, { useEffect, useState } from "react";
import Grafica from './Grafica'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import Menu from "./Menu";
import { cargarRegistros, cargarActividades } from '../redux/registrosSlice'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import moment from "moment";


const MiComponente = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { comprobarLogin } = useAuth();


    // Obtener registros y actividades desde Redux
    const registros = useSelector((state) => state.registros.lista);
    const actividades = useSelector((state) => state.registros.actividades);

    // 1️⃣ Obtener la fecha de hace 7 días
    const fechaLimite = moment().subtract(7, "days").startOf("day");

    // 2️⃣ Filtrar registros de la última semana y que tengan tiempo > 0
    const registrosFiltrados = registros.filter(registro => {
        const fechaRegistro = moment(registro.fecha, "YYYY-MM-DD");
        return fechaRegistro.isSameOrAfter(fechaLimite) && registro.tiempo > 0;
    });

    // 3️⃣ Crear un array con los últimos 7 días asegurando que todos estén presentes
    const ultimos7Dias = [];
    for (let i = 0; i < 7; i++) {
        ultimos7Dias.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
    }
    ultimos7Dias.reverse(); // Ordenamos de menor a mayor

    // 4️⃣ Agrupar por fecha y sumar tiempos
    const tiemposPorDia = Array(7).fill(0); // Iniciar un array con 7 ceros

    registrosFiltrados.forEach(registro => {
        const fechaFormateada = moment(registro.fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
        const index = ultimos7Dias.indexOf(fechaFormateada);
        if (index !== -1) {
            tiemposPorDia[index] += registro.tiempo;
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
                <Grafica etiquetas={ultimos7Dias} datos={tiemposPorDia} nombreGrafica="Tiempo total por día" nombreDatos="Gráfico de minutos de los últimos siete días:" ></Grafica>

            </>


        </Container>


    )
}

export default MiComponente