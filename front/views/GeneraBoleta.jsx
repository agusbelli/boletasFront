import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import { getClientes } from '../redux/actions/cliente';
import { filtroRegistros, getRegistros } from '../redux/actions/registro';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import generarBoleta from '../redux/actions/boleta';
import Pdf from './pdf';

const GeneraBoleta = ({navigation}) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getClientes())
  },[dispatch])
  const clientes = useSelector((state)=>state.clientes)
  const boleta = useSelector((state)=>state.boleta)

  const {control} = useForm()

  const handlerCliente = (evento)=>{
    const value = evento.value
        setDatos({...datos, cliente:value })
  }

  //logica para la fecha

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [datos, setDatos] = useState({
    cliente:null,
    desde: date1,
    hasta:date2
  });
  
  useEffect(()=>{
    clientes?.length && setDatos({...datos, cliente: clientes[0].id})},[clientes])
  const cambiarFecha1 = (event, selectedDate) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    if (selectedDateObj > currentDate){
      return;
    }
    if (selectedDateObj > date2){
      return;
    }

    setDate1(selectedDateObj);
    setDatos({...datos, desde:selectedDateObj })

  };

  const cambiarFecha2 = (event, selectedDate) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    if (selectedDateObj > currentDate){
      return;
    }
    if (selectedDateObj < date1){
      return;
    }
    setDate2(selectedDateObj);
    setDatos({...datos, hasta:selectedDateObj })

  };
  const showDateSelector = (funcion) => {
    if (funcion===1) {
      DateTimePickerAndroid.open({
        value: date1,
        onChange: cambiarFecha1,
        mode: 'date',
        is24Hour: true,
      });
    }else{
      DateTimePickerAndroid.open({
        value: date2,
        onChange: cambiarFecha2,
        mode: 'date',
        is24Hour: true,
      });
    }
  };


  return (
    <View style={styles.container}>
            <Text style={{...styles.texto, fontSize:18, color:secondaryColor}}> CREAR BOLETA PARA:</Text>
      <Controller
            name="cliente"
            control={control}
            render={({ field }) => (
              <Picker 
                selectedValue={datos.cliente}
                onValueChange={(value)=> handlerCliente({value:value})}
                style={styles.picker}
              >
                {clientes?.map((c) => (
                  <Picker.Item key={c.id} label={c.nombre} value={c.id} />
                ))}
              </Picker>
            )}
          />
        <Text style={{...styles.texto, fontSize:18, color:secondaryColor}}>DESDE:</Text>
        <View style={styles.formGroup}>
          <TouchableOpacity
            onPress={() => showDateSelector(1)}>
            <Text style={styles.botonFecha}>{date1.toLocaleString().slice(0, 10)}📅</Text>
          </TouchableOpacity>
          </View>
        <Text style={{...styles.texto, fontSize:18, color:secondaryColor}}>HASTA:</Text>
        <View style={styles.formGroup}>
          <TouchableOpacity
            onPress={() => showDateSelector(2)}>
            <Text style={styles.botonFecha}>{date2.toLocaleString().slice(0, 10)}📅</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => dispatch(generarBoleta(datos))}>
          <Text style={{...styles.buttonText, color:'white'}}>Generar la Boleta</Text>
        </TouchableOpacity>
        {boleta&&(
          <View style={styles.boletaContainer}>
          <Text style={styles.boletaText}>Generado para: {boleta.cliente}</Text>
          <Text style={styles.boletaText}>Numero de registros: {boleta.registros.length}</Text>
          <Text style={styles.boletaText}>Total en la boleta: ${boleta.total}</Text>
            <Pdf boleta={boleta}/>
          </View>
        )}
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
  picker: {
    marginBottom: 20,
    height: 40,
    backgroundColor: secondaryColor,
    color: 'white',
    padding: 15,
    borderRadius: 8,
    width: '80%'
  },  

  texto:{
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  botonFecha: {
    color: '#2f5356',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 10,       // Bordes redondeados
    borderWidth: 1,
    borderColor: secondaryColor,
    padding: 10,           // Espaciado interno para que se vea más como un botón
    backgroundColor: 'white',
  },

  buttonSecondary: {
    backgroundColor: secondaryColor,
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  boletaContainer:{
    borderWidth:1,
    borderColor: secondaryColor,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryColor
  },
  boletaText:{
    color: 'white',
    fontSize: 18
  }
});

export default GeneraBoleta;