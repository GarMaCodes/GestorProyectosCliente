import { createContext } from "react";
//import React, { createContext } from 'react'

const proyectoContext = createContext(); //función que se asigna a constante
//export const proyectoContext = createContext()

export default proyectoContext;

/*Se requiere también un provider pero como usaremos Reducer lo haremos en 
projectoState, ahí importaremos el Reducer y este Context*/
