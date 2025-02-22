import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const comprobarLogin = () => {
    let localStorage = window.localStorage;
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      navigate("/Contenido");
    }
  };

  return { comprobarLogin };
};