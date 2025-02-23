import { data, redirect } from "react-router-dom";

const url = "https://movetrack.develotion.com/";


export const loginApi = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOption = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    return fetch(`${url}login.php`, requestOption)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Error en la petición'));
            }
            return response.json();
        })
        .then(result => {
            console.log('result', result);
            if (result.codigo !== 200) {
                return Promise.reject(new Error(result.mensaje || 'Error en la autenticación'));
            } else {
                return result;
            }
        })
        .catch(error => {
            console.log('error', error);
            throw new Error(error.message || "Hubo un error");
        });
};

export const registrarUsuario = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    return fetch(`${url}usuarios.php`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Error en la petición'));
            }
            return response.json();
        })
        .then(result => {
            console.log('Usuario registrado:', result);
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error(error.message || "Hubo un error al registrar el usuario");
        });
}

export const agregarRegistro = async (idActividad, tiempo, fecha) => {
    const apikey = localStorage.getItem("apiKey");
    const idUsuario = localStorage.getItem("id");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", apikey);
    myHeaders.append("iduser", idUsuario);

    const raw = JSON.stringify({
        "idActividad": idActividad,
        "idUsuario": idUsuario,
        "tiempo": tiempo,
        "fecha": fecha
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${url}registros.php`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Error en la petición'));
            }
            return response.json();
        })
        .then(result => {
            console.log('Registro agregado:', result);
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error(error.message || "Hubo un error al agregar el registro");
        });
};


export const obtenerActividades = async () => {
    const apikey = localStorage.getItem("apiKey");
    const idUsuario = localStorage.getItem("id");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", apikey);
    myHeaders.append("iduser", idUsuario);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const response = await fetch(`${url}actividades.php`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Registros obtenidos:", result);

        return result;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }

};

export const obtenerRegistros = async () => {
    const apikey = localStorage.getItem("apiKey");
    const idUsuario = localStorage.getItem("id");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", apikey);
    myHeaders.append("iduser", idUsuario);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const response = await fetch(`${url}registros.php?idUsuario=${idUsuario}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Registros obtenidos:", result);

        return result;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }







};

export const borrarRegistro = async (idRegistro) => {
    const apikey = localStorage.getItem("apiKey");
    const idUsuario = localStorage.getItem("id");

    if (!apikey || !idUsuario) {
        console.error("Error: No se encontró la API Key o el ID del usuario.");
        return null;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", apikey);
    myHeaders.append("iduser", idUsuario);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow", // 🔥 Añadido según documentación
    };

    try {
        const response = await fetch(`${url}registros.php?idRegistro=${idRegistro}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json(); // 🔥 Puede ser JSON o texto plano
        console.log("Registro eliminado:", result);

        return result;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }
};

