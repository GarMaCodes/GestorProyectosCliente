import React, { Fragment, useContext, useEffect } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto, mensaje } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    //Mensaje d error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje]);

  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //Aplicando array distructuring para acceder al nombre actual en el arreglo
  const [proyectoActual] = proyecto; //proyectoActual es sólo el nombre que se le dió
  //y representa la posición 0, si se agregan más nombres serán las sig. posiciones
  //También podemos acceder como proyecto[0].nombre

  //Eliminando un proyecto
  const handleClick = () => {
    eliminarProyecto(proyectoActual._id); //ó proyecto[0].id
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listadoTareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasproyecto.map((tarea) => <Tarea key={tarea.id} tarea={tarea} />)
        )}
      </ul>

      <button className="deleteButton" onClick={handleClick}>
        Eliminar proyecto &times;
      </button>

      {alerta ? <div className={alerta.categoria}>{alerta.msg}</div> : null}
    </Fragment>
  );
};

export default ListadoTareas;
