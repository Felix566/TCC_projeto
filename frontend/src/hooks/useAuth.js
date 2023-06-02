import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  const handleApiError = (error) => {
    let msgText = "Ocorreu um erro ao processar a requisição";
    let msgType = "error";

    if (error.response && error.response.data && error.response.data.message) {
      msgText = error.response.data.message;
    }
    setFlashMessage(msgText, msgType);
  };

  const register = async (user) => {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const response = await api.post("/users/register", user);
      const data = response.data;

      await authUser(data);
      setFlashMessage(msgText, msgType);
    } catch (error) {
      handleApiError(error);
    }
  };

  const authUser = async (data) => {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/home");
  };

  const login = async (user) => {
    let msgText = "Login realizado com sucesso!";
    let msgType = "success";

    try {
      const response = await api.post("users/", user);
      const data = response.data;

      await authUser(data);
      setFlashMessage(msgText, msgType);
    } catch (error) {
      handleApiError(error);
    }
  };

  const logout = () => {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/");

    setFlashMessage(msgText, msgType);
  };

  return { authenticated, loading, register, logout, login };
}
