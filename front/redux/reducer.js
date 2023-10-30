const initialState = {
    clientes:null,
    productos:null,
    registrosStatic: null,
    registros: null,
    boleta: null
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'GET_CLIENTES':
            return { ...state, clientes: action.payload};
        case 'GET_PRODUCTOS':
            return { ...state, productos: action.payload};
        case 'GET_REGISTROS':
            return { ...state, registros: action.payload, registrosStatic: action.payload};
        case 'FILTER_REGISTROS':
            return { ...state, registros: action.payload};
        case 'GENERA_BOLETA':
            return { ...state, boleta: action.payload};
        default:
            return {...state};
    }
}

export default rootReducer;