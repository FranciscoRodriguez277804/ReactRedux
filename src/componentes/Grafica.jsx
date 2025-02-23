import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate, NavLink } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Grafica = ({ etiquetas, datos, nombreGrafica, nombreDatos }) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/GraficaMinutosPorActividad");
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: `${nombreGrafica ? nombreGrafica : "Grafica"}`,
            },
        },
    };

    const data = {
        labels: etiquetas,
        datasets: [
            {
                label: `${nombreDatos ? nombreDatos : "Datos"}`,
                data: datos,
                backgroundColor: 'rgba(0, 0, 255, 1)',
            }
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    );
    
}

export default Grafica
