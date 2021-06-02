import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //Si usuario o password no existen
  useEffect(() => {
    if (autenticado) {
      //Redirecciona a proyectos
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const handleOnChange = (e) => {
    guardarUsuario({
      ...usuario, //Se copia para que no se sobreescriba
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacíos
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Debes llenar todos los campos", "alerta-error");
    }

    //Pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="container">
      <div className="loginForm">
        <h1>Iniciar Sesión</h1>

        {alerta ? (
          <div className={`${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}

        <form className="form" onSubmit={handleOnSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />

          <input type="submit" value="Iniciar sesión" />
        </form>

        <Link to={"/nueva-cuenta"} className="enlaceCuenta">
          Obtener cuenta
        </Link>
      </div>
      <p className="owner">&copy;2021 GarMaCodes</p>
    </div>
  );
};

export default Login;
