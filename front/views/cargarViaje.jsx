import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { postProducto } from '../redux/actions/producto';

const CargarViaje = ({navigation}) => {
  const dispatch = useDispatch()
  const route = useRoute();
  const cliente = route.params.item;

  //logica para la fecha
  const [date, setDate] = useState(new Date());
  const cambiarFecha = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showDateSelector = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: cambiarFecha,
      mode: 'date',
      is24Hour: true,
    });
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      producto: '',
      cantidad: '',
      unidadMedida: '',
      costo: '',
    },
  });
  //------------------//


  const productos = useSelector((state)=>state.productos)

  
  //Logica de entregas
  const [entregas, setEntregas] = useState([]);
          // AGREGAR VIAJE AL ARREGLO
  const onSubmit = (data) => {
    if (entregas.length === 5) {
      alert('Solo puedes crear hasta 5 entregas');
    } else {
      let p = data.producto;
      if (!p) {
        p = productos[0].nombre;
      } else if (p === 'otro') {
        dispatch(postProducto(data.otroProducto.trimEnd()))
        p = data.otroProducto.trimEnd();
      }
      let u = data.unidadMedida || 'KG';
      const newData = {
        producto: p,
        cantidad: data.cantidad,
        tipoCantidad: u,
        costo: data.costo,
        cliente: cliente.nombre,
        fecha: date
      };
      setEntregas([...entregas, newData]);
      reset({
        producto: '',
        cantidad: '',
        unidadMedida: '',
        costo: '',
      });
    }
  };
        // ELIMINAR VIAJE DEL ARREGLO
  const eliminarEntrega = (index) => {
    const nuevasEntregas = [...entregas];
    nuevasEntregas.splice(index, 1);
    setEntregas(nuevasEntregas);
  };
  const watchin = watch();
  //------------------------------//

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color: primaryColor}}> Cliente: <Text style={styles.title}> {cliente.nombre}</Text></Text>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <TouchableOpacity
            onPress={() => showDateSelector()}>
            <Text style={styles.botonFecha}>{date.toLocaleString().slice(0, 10)} 📅</Text>
          </TouchableOpacity>
          <Controller
            name="producto"
            control={control}
            render={({ field }) => (
              <Picker 
                selectedValue={field.value}
                onValueChange={field.onChange}
                style={styles.picker}
              >
                {productos?.map((p) => (
                  <Picker.Item key={p.id} label={p.nombre} value={p.nombre} />
                ))}
                <Picker.Item label="Otro" value="otro" />
              </Picker>
            )}
          />
          {watchin.producto === 'otro' && (
            <Controller
              name="otroProducto"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Otro producto..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Controller
            name="cantidad"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                placeholder="Cantidad..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
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
                <Picker.Item label="Gramos" value="G" />
                <Picker.Item label="Unidad" value="UNIDAD" />
                <Picker.Item label="Lata" value="LATA" />
              </Picker>
            )}
          />
        </View>

        <View style={styles.formGroup}>
          <Controller
            name="costo"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                placeholder="$0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
        </View>
        
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar la lista de entregas (si es que hay entregas) */}
      {entregas.length !== 0 && (
        <ScrollView style={styles.entregasContainer}>
          <Text style={styles.entregasTitle}>Entregas Realizadas:</Text>
          {entregas.map((entrega, index) => (
            <View key={index} style={styles.entregaItem}>
              <Text style={styles.entregaText}>
                {entrega.producto} {entrega.cantidad} {entrega.tipoCantidad} ${entrega.costo}
              </Text>
              <TouchableOpacity onPress={() => eliminarEntrega(index)}>
                <Text style={styles.botonEliminar}>✖</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
          style={styles.buttonGuardar}
          onPress={()=> axios.post('https://boletasback-dev-mmse.3.us-1.fl0.io/registro', {registros:entregas})
                  .then(res=>{
                    alert("Entregas cargadas con exito")
                    return navigation.navigate('Inicio')
                  })
                  .catch (err=>alert(err))}>
          <Text style={{...styles.buttonText, color: secondaryColor}}>Guardar</Text>
        </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  )
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  form: {
    width: '80%',
  },
  formGroup: {
    marginVertical: 10,
  },
  botonFecha: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 10,       // Bordes redondeados
    borderWidth: 1,
    borderColor: primaryColor,
    padding: 10,           // Espaciado interno para que se vea más como un botón
    backgroundColor: 'white',
  },
  input: {
    margin:5,
    backgroundColor: 'white',
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },

  buttonPrimary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: primaryColor,
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  buttonGuardar: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: secondaryColor,
    color: secondaryColor,
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  entregasContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  entregasTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  entregaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: secondaryColor,
    color: secondaryColor,
    backgroundColor:  secondaryColor,
    borderRadius: 5,
  },
  entregaText: {
    flex: 1,
    color: 'white',
  },
  botonEliminar: {
    color: 'red',
    fontSize: 20,
  },
  picker: {
    height: 40,
    width: '100%',
    backgroundColor: primaryColor,
    borderWidth: 1,
    borderRadius: 5,

  },
});

export default CargarViaje;
