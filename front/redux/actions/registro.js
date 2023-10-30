import axios from 'axios'

export const postRegistro = (data)=>{
    return async function(){
        try {
            await axios.post('https://boletasback-dev-mmse.3.us-1.fl0.io/registro', data)
            alert("Entregas cargadas con exito")
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }
};

export const getRegistros = ()=>{
    return async function (dispatch){
        const data = await axios.get("https://boletasback-dev-mmse.3.us-1.fl0.io/registro");
        const registros = data.data;
        dispatch({ type: "GET_REGISTROS", payload: registros });
    };
}

export const deleteRegistro = (idRegistro)=>{
    console.log(idRegistro);
    return async function (){
            await axios.delete(`https://boletasback-dev-mmse.3.us-1.fl0.io/registro?idRegistro=${idRegistro}`, )
            .then(()=>{
                getRegistros()
                alert('Registro eliminado ✔')
            })
            .catch (()=>{ return alert('No se pudo eliminar el registro !')})   
    }
}

export const filtroRegistros = (filtros, registros)=>{
    const {orden, selectedClient} = filtros
    let registrosFiltrados = registros;

    //ordenPorFecha
    if (orden==='asc') {
        registrosFiltrados.sort((a,b)=>(a.fecha > b.fecha ? 1 : -1))
    }else{
        registrosFiltrados.sort((a,b)=>(a.fecha < b.fecha ? 1 : -1))
    }

    //filtroPorCliente
    if(selectedClient !== 'todos'){
        registrosFiltrados = registrosFiltrados.filter((registro)=>registro.idCliente === selectedClient )
    }

    return async function (dispatch){
        dispatch({ type: "FILTER_REGISTROS", payload: registrosFiltrados });
    };
}
