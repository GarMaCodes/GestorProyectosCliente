import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  const handleClick = () => {
    proyectoActual(proyecto._id);
    obtenerTareas(proyecto._id);
  };

  //Función para agregar el proyecto actual

  return (
    <li>
      <button className="oneProjectButton" onClick={handleClick}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
