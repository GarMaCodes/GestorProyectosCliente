import React, { useContext, useEffect } from "react";
import SideBar from "../layout/SideBar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
  //Extrayendo la información de autenticación
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div className="appContainer">
      <SideBar />

      <section className="seccionPrincipal">
        <Barra />

        <main>
          <FormTarea />

          <div className="taskContainer">
            <ListadoTareas />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Proyectos;
