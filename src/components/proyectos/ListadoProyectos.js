import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";

const ListadoProyectos = () => {
  //Obteniendo el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  //Obteniendo los proyectos en cuanto se carga el componente
  useEffect(() => {
    obtenerProyectos();
  }, []);

  //Cuando se mueva todo a una base de datos no habrá ningún proyecto creado
  if (proyectos.length === 0)
    return <p>No hay proyectos. Comienza creando uno.</p>;

  return (
    <ul className="listadoProyectos">
      {proyectos.map((proyecto) => (
        <Proyecto key={proyecto._id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
