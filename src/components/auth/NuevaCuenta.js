import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

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
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario;

  const handleOnChange = (e) => {
    guardarUsuario({
      ...usuario, //Se copia para que no se sobreescriba
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacíos
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Debes llenar todos los campos", "alerta-error");
      return;
    }

    //Validar que el password sea de mínimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "La contraseña debe ser de por lo menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Validar que los dos passwords sean iguales
    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas ingresadas no coinciden", "alerta-error");
      return;
    }

    //Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="container">
      <div className="loginForm">
        <h1>Obtener una cuenta</h1>

        {alerta ? (
          <div className={`${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}

        <form className="form" onSubmit={handleOnSubmit}>
          <label htmlFor="nombre">Nombre de usuario</label>
          <input
            type="text"
            id="userName"
            name="nombre"
            value={nombre}
            onChange={handleOnChange}
          />

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

          <label htmlFor="confirmar">Confirmar password</label>
          <input
            type="password"
            id="confirmar"
            name="confirmar"
            value={confirmar}
            onChange={handleOnChange}
          />

          <input type="submit" value="Crear cuenta" />
        </form>

        <Link to={"/"} className="enlaceCuenta">
          Iniciar sesión
        </Link>
      </div>

      <p className="owner">&copy;2021 GarMaCodes</p>
    </div>
  );
};

export default NuevaCuenta;
