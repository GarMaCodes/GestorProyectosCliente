import React, { useState, Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Extrayendo los states de proyectoState
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    cancelarNuevoProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const handleOnChange = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }
    //Agregarlo al state
    agregarProyecto(proyecto);
    mostrarFormulario("translateY(-200px)");

    //Reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };

  const handleOnClick = () => {
    mostrarFormulario("translateY(-10px)");
  };

  const handleClick = () => {
    mostrarFormulario("translateY(-200px)");
    cancelarNuevoProyecto();
    guardarProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        className="newProjectButton"
        type="button"
        onClick={handleOnClick}
      >
        Nuevo proyecto
      </button>

      <form className="newProjectForm" onSubmit={handleOnSubmit}>
        <input
          type="text"
          className="inputText"
          placeholder="Nombre del proyecto"
          name="nombre"
          value={nombre}
          onChange={handleOnChange}
        />

        <input
          type="submit"
          className="addProyectButton"
          value="Agregar proyecto"
        />

        <button className="cancelButton" type="button" onClick={handleClick}>
          Cancelar
        </button>
      </form>

      <div className="errorBox">
        {errorformulario ? (
          <p>El nombre del proyecto es indispensable</p>
        ) : null}
      </div>
    </Fragment>
  );
};

export default NuevoProyecto;
