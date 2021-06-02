import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const {
    errortarea,
    errorcolor,
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    cambiarColor,
    obtenerTareas,
    actualizarTarea,
  } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({ nombre: "" });
    }
  }, [tareaseleccionada]);

  //State del formulario
  const [tarea, guardarTarea] = useState({ nombre: "" });
  const { nombre } = tarea;

  if (!proyecto) return null;

  //Array destructuring para obtener el proyecto actual
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      cambiarColor("rgb(128, 16, 16)");
      return; //Para que no se ejecuten las siguientes líneas del código
    }

    //Código para determinar si es edición o nueva tarea
    if (tareaseleccionada === null) {
      //Agregar nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
      cambiarColor("transparent");
    } else {
      //Editar tarea existente
      actualizarTarea(tarea);
    }

    //Obteniendo y filtrando las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //Resetear el form
    guardarTarea({ nombre: "" });
  };

  return (
    <div className="divFormTarea">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputTarea"
          placeholder="Nombre de la tarea"
          name="nombre"
          value={nombre}
          onChange={handleChange}
        />

        <input
          type="submit"
          value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
        />
      </form>

      <div className="errorDiv" style={{ background: `${errorcolor}` }}>
        {errortarea ? (
          <p className="errorMessage">
            Se requiere un nombre para la nueva tarea
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default FormTarea;
