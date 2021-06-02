import clienteAxios from "./axios";

//Si existe un token se enviará por header, si no se eliminará del header del
//objeto clienteAxios
const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
  }
};

export default tokenAuth;
