import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  CAMBIAR_COLOR,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: action.payload,
      };

    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyecto: [...state.tareasproyecto, action.payload],
        errortarea: false,
        errorcolor: action.payload,
      };

    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };

    case CAMBIAR_COLOR:
      return {
        ...state,
        errorcolor: action.payload,
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };

    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        tareaseleccionada: null,
      };

    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };

    default:
      return state;
  }
};
