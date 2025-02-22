import React from 'react'
import Grafica from './Grafica'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink, Navigate } from "react-router-dom";


const MiComponente = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registros = useSelector((state) => state.registros.lista);

    useEffect(() => {
        dispatch(cargarRegistros());
    }, [dispatch])



    return (
        <Grafica etiquetas={registros}></Grafica>
    )
}

export default MiComponente