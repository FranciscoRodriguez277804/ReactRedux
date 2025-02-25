import { createSlice } from "@reduxjs/toolkit";
import { obtenerRegistros, borrarRegistro, agregarRegistro as agregarRegistroAPI , obtenerActividades } from "../service/apiService";
import moment from "moment";
import toast from "react-hot-toast";

const registrosSlice = createSlice({
  name: "registros",
  initialState: {
    lista: [],
    actividades: [],
    estado: "idle",
    error: null,
    tiempoDiario: 0,
    tiempoAyer: 0, 
  },
  reducers: {
    setRegistros: (state, action) => {
      state.lista = action.payload;
    },
    agregarRegistroState: (state, action) => { 
      state.lista.push(action.payload);
    },
    eliminarRegistro: (state, action) => {
      state.lista = state.lista.filter((registro) => registro.id !== action.payload);
    },
    todasLasActividades: (state, action) => {
      state.actividades = action.payload;
    },
    actualizarTiempoDiario: (state) => {
      state.tiempoDiario = state.lista.reduce((acumulador, registro) => {
        const fechaRegistro = moment(registro.fecha);
        const fechaActual = moment().startOf("day");

        return fechaRegistro.isSame(fechaActual, "day")
          ? acumulador + registro.tiempo
          : acumulador;
      }, 0);
    },
    actualizarTiempoAyer: (state) => {
      state.tiempoAyer = state.lista.reduce((acumulador, registro) => {
        const fechaRegistro = moment(registro.fecha);
        const fechaAyer = moment().subtract(1, "days").startOf("day"); // Fecha de ayer
        return fechaRegistro.isSame(fechaAyer, "day")
          ? acumulador + registro.tiempo
          : acumulador;
      }, 0);
    },
    resetearEstado: (state) => {
      state.lista = [];
      state.tiempoDiario = 0;
      state.tiempoAyer = 0;
    },
  },
});


export const { setRegistros, agregarRegistroState, eliminarRegistro, todasLasActividades , actualizarTiempoDiario , actualizarTiempoAyer , resetearEstado } = registrosSlice.actions;

// Función para cargar registros desde la API
export const cargarRegistros = () => async (dispatch) => {
  try {
    const data = await obtenerRegistros();
 
    if (data.codigo === 200) {
      dispatch(setRegistros(data.registros));
    } else {
      toast.error("Error al cargar registros:", data.mensaje)
    }
  } catch (error) {
    throw new Error(error.message || "Hubo un error");
  
  }
};

// Función para agregar un registro en la API y en Redux
export const agregarRegistroAsync = (nuevoRegistro) => async (dispatch) => {
  try {
    const resultado = await agregarRegistroAPI(nuevoRegistro); // "agregarRegistroAPI"
    if (resultado.codigo === 200) {
      dispatch(agregarRegistroState(resultado.registro)); 
      dispatch(cargarRegistros());
    } else {
      toast.error("Error al agregar:", resultado?.mensaje)
  
    }
  } catch (error) {
    throw new Error(error.message || "Hubo un error");
  }
};

// Función para eliminar un registro
export const eliminarRegistroAsync = (idRegistro) => async (dispatch) => {
  try {
    const resultado = await borrarRegistro(idRegistro);
    if (resultado?.codigo === 200) {
      dispatch(eliminarRegistro(idRegistro));
    } else {
      toast.error("Error al cargar registros:", data.mensaje)
    }
  } catch (error) {
    throw new Error(error.message || "Hubo un error");
  }
};

export const cargarActividades = () => async (dispatch) => {
  try {
    const data = await obtenerActividades();

    if (data.codigo === 200) {
      dispatch(todasLasActividades(data.actividades));
    } else {
      toast.error("Error al agregar:", resultado?.mensaje)
    }
  } catch (error) {
    throw new Error(error.message || "Hubo un error");
  }
};



export default registrosSlice.reducer;

