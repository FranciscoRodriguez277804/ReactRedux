import { data, redirect } from "react-router-dom";

const url = "https://movetrack.develotion.com/";
const urlImagenes = "https://movetrack.develotion.com/imgs/";

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

export const agregarRegistro = async (idActividad, tiempo, fecha) => {
    const apikey = localStorage.getItem("apiKey");  // Obtiene la API Key almacenada
    const idUsuario = localStorage.getItem("id");   // Obtiene el ID del usuario

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

///solucion momentania cambiar por fetch 
const actividadesData = {
    "codigo": 200,
    "actividades": [
      { "id": 1, "nombre": "Caminata", "imagen": 5 },
      { "id": 2, "nombre": "Pesas", "imagen": 6 },
      { "id": 4, "nombre": "Fútbol", "imagen": 2 },
      { "id": 5, "nombre": "Natación", "imagen": 1 },
      { "id": 6, "nombre": "HIIT", "imagen": 6 },
      { "id": 7, "nombre": "Correr", "imagen": 5 },
      { "id": 8, "nombre": "Bicicleta", "imagen": 4 },
      { "id": 9, "nombre": "Basketball", "imagen": 3 }
    ]
  };

  export default actividadesData;


// export const obtenerActividades = async () => {
//     const apikey = localStorage.getItem("apiKey");
//     const id = localStorage.getItem("id");

//     if (!apikey || !id) {
//         console.error("Faltan credenciales en localStorage");
//         throw new Error("Faltan credenciales");
//     }

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${apikey}`);

//     return fetch(`${url}actividades.php?id=${id}`, {
//         method: 'GET',
//         headers: myHeaders
//     })
//     .then(response => {
//         console.log("HTTP Status:", response.status); // Ver el código de respuesta HTTP
//         if (!response.ok) {
//             return Promise.reject(new Error(`Error: ${response.status} - ${response.statusText}`));
//         }
//         return response.json();
//     })
//     .then(result => {
//         console.log('Resultado de la API:', result);
//         if (result.codigo !== 200) {
//             return Promise.reject(new Error(result.mensaje || 'Error en la autenticación'));
//         }
//         return { ...result };
//     })
//     .catch(error => {
//         console.error("Error en la petición:", error);
//         throw new Error(error.message || "Hubo un error");
//     });
    
// };

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
        console.log("Registros obtenidos:", result); // ✅ Asegúrate de que ves la estructura esperada en la consola

        return result; // ✅ Devuelve el JSON correctamente
    } catch (error) {
        console.error("Error en la petición:", error);
        return null; // ❌ Retorna `null` en caso de error en lugar de undefined
    }
};
