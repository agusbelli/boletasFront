import axios from "axios";

export const getClientes = ()=>{
    return async function (dispatch){
        const data = await axios.get("https://boletasback-dev-mmse.3.us-1.fl0.io/cliente");
        const clientes = data.data;
        dispatch({ type: "GET_CLIENTES", payload: clientes });
    };
}