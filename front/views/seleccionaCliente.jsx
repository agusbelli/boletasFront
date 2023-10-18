import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const SeleccionaCliente = ({navigation}) => {
  const [boton, setBoton] = useState(true)
  const [error,setError] = useState(0)
  
  const validador = (value)=>{

    const existe = clients.filter(c=> c.nombre.toLocaleLowerCase() ===value.toLocaleLowerCase())
    if (value.length === 0){
      setError(0)
    }else if (value.length <= 3){
      setError(1)
    }else if (existe.length) {
      setError(2)
    }else {
      setError(3)
    }
  }

  const clients = [
    { id: 1, nombre: 'La Granja' },
    { id: 2, nombre: 'El Sabor' },
    { id: 3, nombre: 'La Cocina' },
    { id: 4, nombre: 'El Frutero' },
    { id: 5, nombre: 'La Frutera' },
    { id: 6, nombre: 'El Panadero' },
    { id: 7, nombre: 'La Panadería' },
    { id: 8, nombre: 'El Granero' },
    { id: 9, nombre: 'La Granera' },
    { id: 10, nombre: 'La Cocina' },
    { id: 11, nombre: 'El Frutero' },
    { id: 12, nombre: 'La Frutera' },
    { id: 13, nombre: 'El Panadero' },
    { id: 14, nombre: 'La Panadería' },
    { id: 15, nombre: 'El Granero' },
    { id: 16, nombre: 'La Granera' },
    { id: 17, nombre: 'La Cocina' },
    { id: 18, nombre: 'El Frutero' },
    { id: 19, nombre: 'La Frutera' },
    { id: 20, nombre: 'El Panadero' },
    { id: 21, nombre: 'La Panadería' },
    { id: 22, nombre: 'El Granero' },
    { id: 23, nombre: 'La Granera' },
];

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
        style={[styles.boton]}
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
          onPress={() => setBoton(!boton)}>
          <Text style={styles.clientName}>Enviar</Text></TouchableOpacity>)}
      {error===1 && (
          <Text style={styles.errorName}>debe tener 4 letras o más !</Text>)}
      {error===2 && (
          <Text style={styles.errorName}>este nombre ya existe !</Text>)}

      <View style={styles.clientList}>
        <FlatList
          data={clients}
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
        />
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
    marginTop: 65,
    backgroundColor: 'white',
    borderColor: 'lightgray',
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
