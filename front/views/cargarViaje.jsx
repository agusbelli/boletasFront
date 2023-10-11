import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form"

const CargarViaje = () => {
  const { control, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      producto: "",
      cantidad: "",
      unidadMedida: "",
      costo:"",
    },
  })

  const [entregas, setEntregas] = useState([])
  const productos = [
    { id: 1, nombre: 'Producto 1' },
    { id: 2, nombre: 'Producto 2' },
    { id: 3, nombre: 'Producto 3' },
    { id: 4, nombre: 'Producto 4' },
    { id: 5, nombre: 'Producto 5' }
];

  //AGREGAR VIAJE AL ARREGLO
  const onSubmit = (data) => {
    let p = data.producto
    if (!p) {
      p = productos[0].nombre
    }else if (p==='otro') {
      p = data.otroProducto
    }
    let u = data.unidadMedida || 'KG';
    const newData =  {...data, producto:p, unidadMedida: u}
    setEntregas([...entregas, newData])
    reset({
      producto: '', // Restablece el valor de 'producto' al vacío
      cantidad: '', // Restablece el valor de 'cantidad' al vacío
      unidadMedida: '', // Restablece el valor de 'unidadMedida' al vacío
      costo: '', // Restablece el valor de 'costo' al vacío
    });
  };

    //ELIMINAR VIAJE DEL ARREGLO
  const eliminarEntrega = (index) => {
    const nuevasEntregas = [...entregas];
    nuevasEntregas.splice(index, 1);
    setEntregas(nuevasEntregas);
  };
  const watchin = watch()

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Cargar Viaje</Text>
      <View style={styles.form}>
        <View style={styles.formGroup}>
        <Text>Producto:</Text>
          <Controller
            name="producto"
            control={control}
            render={({ field }) => (
            <Picker
              selectedValue={field.value}
              onValueChange={field.onChange}
              style={styles.picker}
            >
              {productos?.map(p=>(<Picker.Item  key={p.id} label={p.nombre} value={p.nombre} />))}
              <Picker.Item label='otro' value='otro' />
            </Picker>
            )}
          />
          {watchin.producto==='otro' && <Controller
            name="otroProducto"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="otro producto..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
              
            )}
          />}
        </View>

        <View style={styles.formGroup}>
          <Controller
            name="cantidad"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value  }}) => (
            <TextInput
                keyboardType='numeric'
                placeholder="cantidad..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
            />)}
          />
        </View>

        <View style={styles.formGroup}>
          <Controller
            name="unidadMedida"
            control={control}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={field.onChange}
                style={styles.picker}
              >
                <Picker.Item label="Kg" value="KG" />
                <Picker.Item label="gramos" value="G" />
                <Picker.Item label="Unidad" value="UNIDAD" />
                <Picker.Item label="Lata" value="LATA" />
              </Picker>
            )}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Costo:</Text>
          <Controller
            name="costo"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType='numeric'
                placeholder="$0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar la lista de entregas (si es que hay entregas)*/}
      {entregas.length !== 0 && (
        <View style={styles.entregasContainer}>
          <Text style={styles.entregasTitle}>Entregas Realizadas:</Text>
          {entregas.map((entrega, index) => (
            <View key={index} style={styles.entregaItem}>
              <Text style={styles.entregaText}>
                {entrega.producto} {entrega.cantidad} {entrega.unidadMedida} 
              </Text>
              <TouchableOpacity onPress={() => eliminarEntrega(index)}>
                <Text style={styles.botonEliminar}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7F50',
  },
  form: {
    width: '80%', // Ajusta el ancho del formulario según tus necesidades
  },
  formGroup: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  picker: {
    height: 40,
    width: '100%', // Ajusta el ancho del picker según tus necesidades
  },
  buttonPrimary: {
    backgroundColor: '#FF7F50',
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  entregasContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  entregasTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5F9EA0',
  },
  entregaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  entregaText: {
    flex: 1,
  },
  botonEliminar: {
    color: 'red',
    fontSize: 30,
  },
});

export default CargarViaje;