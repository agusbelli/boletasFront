import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import Recibo from '../componentes/recibo';
import {useDispatch, useSelector} from 'react-redux'
import { getClientes } from '../redux/actions/cliente';
import { filtroRegistros, getRegistros } from '../redux/actions/registro';

const Registros = ({navigation}) => {
  const dispatch = useDispatch()
  const registrosStatic = useSelector((state)=>state.registrosStatic)
  const boletas = useSelector((state)=>state.registros)
  useEffect(()=>{
    dispatch(getClientes())
    dispatch(getRegistros())
  },[dispatch])
  const clientes = useSelector((state)=>state.clientes)

  const [filtros, setFiltros] = useState({
    selectedClient: "todos",
    orden: "desc"
  });
  const {control} = useForm()

  const handlerFiltros = (evento)=>{
    const propiedad = evento.name
    const value = evento.value
    switch (propiedad) {
      case 'orden':
        dispatch(filtroRegistros({...filtros, orden:value }, registrosStatic))
        setFiltros({...filtros, orden:value })
        break;
      case 'selectedClient':
        dispatch(filtroRegistros({...filtros, selectedClient:value }, registrosStatic))
        setFiltros({...filtros, selectedClient:value })
        break;
    }
  }

  return (
    <View style={styles.container}>
       <View style={styles.pickerContainer}>
      <Controller
            name="cliente"
            control={control}
            render={({ field }) => (
              <Picker 
                selectedValue={filtros.selectedClient}
                onValueChange={(value)=> handlerFiltros({value:value, name:"selectedClient"})}
                style={styles.picker}
              >
                <Picker.Item label="todos" value="todos" />
                {clientes?.map((c) => (
                  <Picker.Item key={c.id} label={c.nombre} value={c.id} />
                ))}
              </Picker>
            )}
          />
          {filtros.orden==='desc'
          ?(<TouchableOpacity
          style={styles.buttonPrimary}
          onPress={()=>handlerFiltros({value:'asc', name:"orden"})}>
          <Text style={styles.buttonText}> ⬇📅</Text>
        </TouchableOpacity>)
        :(<TouchableOpacity
        style={styles.buttonPrimary}
        onPress={()=>handlerFiltros({value:'desc', name:"orden"})}>
        <Text style={styles.buttonText}> ⬆📅</Text>
      </TouchableOpacity>)}
      </View>
      <View style={styles.clientList}>
        <FlatList
          data={boletas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Recibo item={item} navigation={navigation}/>
          )}}/>
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
  picker: {
    marginBottom: 20,
    height: 40,
    backgroundColor: secondaryColor,
    color: 'white',
    padding: 15,
    borderRadius: 8,
    width: '80%'

  },  
  clientList: {
    width: '80%',
    flex: 1, // Este elemento ocupará el espacio restante
    paddingHorizontal: 16, // Espacio interno horizontal
    paddingTop: 16, // Espacio interno superior
  },
  buttonPrimary: {
   fontSize: 16
  },
  pickerContainer: {
    flexDirection: 'row', // Para colocar el Picker y el botón en fila
    alignItems: 'center', // Alineación vertical al centro
    justifyContent: 'space-between', // Alinear elementos al principio y al final
    paddingHorizontal: 16, // Espacio interno horizontal
    paddingTop: 16, // Espacio interno superior
  },
});

export default Registros;
