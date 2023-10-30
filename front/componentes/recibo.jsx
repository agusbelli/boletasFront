import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { deleteRegistro } from '../redux/actions/registro';
import {useDispatch} from 'react-redux'

const Recibo = (props)=>{
    const {item, navigation} = props

    const dispatch = useDispatch()

    const [boton, setBoton] = useState(false)

  return (
    <View  style={styles.clientItem}>
    <TouchableOpacity
        onPress={() => setBoton(!boton)}
        >
        <Text style={styles.clientName}><Text style={{...styles.clientName, color:secondaryColor}}>{item.cliente.nombre} </Text> {item.fecha.slice(0, 10)}</Text>
        <Text style={styles.clientName}>{item.producto.nombre} {item.cantidad}{item.tipoCantidad} <Text style={{...styles.clientName, color:'#348329'}}> ${item.costo}</Text></Text>
        {boton && (
            <View>
                <Text style={styles.clientName}>
                <TouchableOpacity style={styles.botonEliminar} 
                onPress={() => {
                    dispatch(deleteRegistro(item.id))
                    .then(navigation.navigate('Inicio'))}}>
                    <Text>Eliminar❌</Text>
                </TouchableOpacity>
                </Text>
            </View>
        )}
    </TouchableOpacity>
    </View>
    )
}

//estilos
const primaryColor = '#FF7F50'; // Color melocotón
const secondaryColor = '#5F9EA0'; // Color turquesa

const styles = StyleSheet.create({
    clientItem: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: secondaryColor,
    },
    botonEliminar: {
        padding: 15,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
    },

    clientName: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
export default Recibo;