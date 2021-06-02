import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =
    tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const [proyectoActual] = proyecto;

  //Función que se ejecuta al presionar el botón de eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyecto._id);
  };

  //Modificando el estado de las tareas
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  //Agrega una tarea actual para su edición
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea">
      <p>{tarea.nombre}</p>

      <div className="actions">
        {tarea.estado ? (
          <button
            className="completeButton"
            onClick={() => cambiarEstado(tarea)}
          >
            Terminado
          </button>
        ) : (
          <button
            className="incompleteButton"
            onClick={() => cambiarEstado(tarea)}
          >
            En proceso
          </button>
        )}

        <button className="btn" onClick={() => seleccionarTarea(tarea)}>
          {" "}
          Editar
        </button>

        <button className="btn" onClick={() => tareaEliminar(tarea._id)}>
          {" "}
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
