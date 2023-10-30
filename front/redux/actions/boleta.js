import axios from 'axios'

const generarBoleta = (datos)=>{
    return async function (dispatch){
        const data = await axios.get(`https://boletasback-dev-mmse.3.us-1.fl0.io/registro/boleta?cliente=${datos.cliente}&desde=${datos.desde}&hasta=${datos.hasta}`);
        const boleta = data.data;
        dispatch({ type: "GENERA_BOLETA", payload: boleta });
    };
};

export default generarBoleta;