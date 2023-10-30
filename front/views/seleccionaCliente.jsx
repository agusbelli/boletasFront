import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import { getClientes } from '../redux/actions/cliente.js';
import { getProductos } from '../redux/actions/producto.js';

const SeleccionaCliente = ({navigation}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getClientes())
    dispatch(getProductos())
  },[dispatch])

  const [boton, setBoton] = useState(true)
  const [error,setError] = useState(0)
  const [cliente,setCliente] = useState("")
  const validador = (value)=>{
    const existe = clientes.filter(c=> c.nombre.toLocaleLowerCase() ===value.toLocaleLowerCase().trimEnd())
    if (value.length === 0){
      setError(0)
    }else if (value.length <= 3){
      setError(1)
    }else if (existe.length) {
      setError(2)
    }else {
      setError(3)
      setCliente(value.trimEnd())
    }
  }

  const clientes = useSelector((state)=>state.clientes)

const {
  control,
  handleSubmit,
  formState: { errors },
  watch,
  reset,
} = useForm();


  return (
    <View style={styles.container}>
      {boton && (
      <TouchableOpacity
        style={styles.botonNuevoCliente}
        onPress={() => setBoton(!boton)}>
          <Text style={styles.clientName}>Nuevo Cliente  +</Text>
      </TouchableOpacity>
      )}
      {!boton && (
        <Controller
          name="otroProducto"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="nuevo cliente..."
              onBlur={onBlur}
              onChangeText={validador}
              value={value}
              style={styles.input}
            />
        )}/>
      )}
      {error===3 && (
        <TouchableOpacity
            onPress={()=> axios.post('https://boletasback-dev-mmse.3.us-1.fl0.io/cliente', {cliente})
            .then(res=>navigation.navigate('Cargar Viaje', {item:{nombre:cliente}}))
            .catch (err=>alert("Problemas al crear un nuevo cliente"))}>
          <Text style={{...styles.clientName, color: secondaryColor, margin: 2}}> Siguiente ➡</Text></TouchableOpacity>)}
      {error===1 && (
          <Text style={styles.errorName}>debe tener 4 letras o más !</Text>)}
      {error===2 && (
          <Text style={styles.errorName}>este nombre ya existe !</Text>)}

      <View style={styles.clientList}>
        {clientes
        ?(<FlatList
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.clientItem,
              ]}
              onPress={() => navigation.navigate('Cargar Viaje', {item})}
            >
              <Text style={styles.clientName}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />)
        :(<Text>Cargando...</Text>)}
      </View>
    </View>
  );
};

const primaryColor = '#FF7F50'; // Color melocotón
const secondaryColor = '#5F9EA0'; // Color turquesa

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 65,
    color: primaryColor,
  },
  clientList: {
    width: '80%',
  },
  botonNuevoCliente:{
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 10,       // Bordes redondeados
    padding: 10,           // Espaciado interno para que se vea más como un botón
    backgroundColor: primaryColor, // Fondo blanco
  },
  clientItem: {
    backgroundColor: secondaryColor,
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  clientName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorName: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginTop: 65,
    fontSize:15,
    backgroundColor: primaryColor,
    color: 'white',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  boton: {
    marginTop: 65,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeleccionaCliente;