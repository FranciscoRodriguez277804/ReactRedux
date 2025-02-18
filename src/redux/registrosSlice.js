import { createSlice } from "@reduxjs/toolkit";
import { obtenerRegistros, borrarRegistro, agregarRegistro as agregarRegistroAPI } from "../service/apiService";

const registrosSlice = createSlice({
  name: "registros",
  initialState: {
    lista: [],
    estado: "idle",
    error: null,
  },
  reducers: {
    setRegistros: (state, action) => {
      state.lista = action.payload;
    },
    agregarRegistroState: (state, action) => { // 🔹 Renombrado para evitar conflicto
      state.lista.push(action.payload);
    },
    eliminarRegistro: (state, action) => {
      state.lista = state.lista.filter((registro) => registro.id !== action.payload);
    },
  },
});

// Exportar acciones
export const { setRegistros, agregarRegistroState, eliminarRegistro } = registrosSlice.actions;

// Función para cargar registros desde la API
export const cargarRegistros = () => async (dispatch) => {
  try {
    const data = await obtenerRegistros();
    if (data.codigo === 200) {
      dispatch(setRegistros(data.registros));
    } else {
      console.error("Error al cargar registros:", data.mensaje);
    }
  } catch (error) {
    console.error("Error en la API:", error);
  }
};

// Función para agregar un registro en la API y en Redux
export const agregarRegistroAsync = (nuevoRegistro) => async (dispatch) => {
  try {
    const resultado = await agregarRegistroAPI(nuevoRegistro); // 🔹 Usa el alias "agregarRegistroAPI"
    if (resultado.codigo === 200) {
      dispatch(agregarRegistroState(resultado.registro)); // 🔹 Usa la acción renombrada
    } else {
      console.error("Error al agregar:", resultado?.mensaje);
    }
  } catch (error) {
    console.error("Error en la API:", error);
  }
};

// Función para eliminar un registro
export const eliminarRegistroAsync = (idRegistro) => async (dispatch) => {
  try {
    const resultado = await borrarRegistro(idRegistro);
    if (resultado?.codigo === 200) {
      dispatch(eliminarRegistro(idRegistro));
    } else {
      console.error("Error al eliminar:", resultado?.mensaje);
    }
  } catch (error) {
    console.error("Error en la API:", error);
  }
};

// Exportar el reducer
export default registrosSlice.reducer;
