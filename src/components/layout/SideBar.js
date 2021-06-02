import React, { useState, useContext } from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListadoProyectos from "../proyectos/ListadoProyectos";
import proyectoContext from "../../context/proyectos/proyectoContext";

const SideBar = () => {
  const proyectosContext = useContext(proyectoContext);
  const { formulario } = proyectosContext;

  return (
    <aside className="sideBar">
      <h1>Gestor de Proyectos</h1>

      <NuevoProyecto />

      <div className="proyectos" style={{ transform: `${formulario}` }}>
        <h2>Tus proyectos</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default SideBar;
