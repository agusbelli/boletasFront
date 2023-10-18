import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Recibo = (props)=>{
    const {item} = props

    const [boton, setBoton] = useState(false)

  return (
    <View  style={styles.clientItem}>
    <TouchableOpacity
        onPress={() => setBoton(!boton)}
        >
        <Text style={styles.clientName}>{item.fecha}</Text>
        <Text style={styles.clientName}>{item.nombreCliente}</Text>
        <Text style={styles.clientName}> {item.producto} {item.cantidad}</Text>
        <Text style={styles.clientName}>${item.costo}</Text>
        {boton && (
            <View>
                <Text style={styles.clientName}>
                <TouchableOpacity style={styles.botonEliminar} onPress={() => console.log("hola")}>
                    <Text>Eliminar</Text>
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
        backgroundColor: secondaryColor,
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
    },
    botonEliminar: {
        padding: 15,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'red',
        color: 'white',
    },

    clientName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
export default Recibo;