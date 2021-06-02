import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  //Extrayendo la información de autenticación
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    cerrarSesion();
  };

  return (
    <header className="header">
      {usuario ? (
        <p className="usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className="nav">
        <a href="#" onClick={handleClick}>
          Cerrar sesión
        </a>
      </nav>
    </header>
  );
};

export default Barra;
