import axios from "axios"

 export const postProducto = (producto)=>{
    return async function(){
        try {
            const newProducto = await axios.post('https://boletasback-dev-mmse.3.us-1.fl0.io/producto', {producto})
            console.log(newProducto);
        } catch (error) {
            console.log(error);
            alert("prueba cargar de nuevo el producto")
        }
    }
}

export const getProductos = ()=>{
    return async function (dispatch){
        const data = await axios.get("https://boletasback-dev-mmse.3.us-1.fl0.io/producto");
        const productos = data.data;
        dispatch({ type: "GET_PRODUCTOS", payload: productos });
    };
}