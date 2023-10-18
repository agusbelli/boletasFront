import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import Recibo from './recibo';

const Boletas = () => {
  const [selectedClient, setSelectedClient] = useState("todos");
  const {control} = useForm()
  let boletas = [
    {
      "id": 1,
      "fecha": "2023-03-08",
      "costo": 100,
      "cantidad": 1,
      "nombreCliente": "Juan García",
      "producto": "Manzanas"
    },
    {
      "id": 2,
      "fecha": "2023-03-09",
      "costo": 200,
      "cantidad": 2,
      "nombreCliente": "María Pérez",
      "producto": "Peras"
    },
    {
      "id": 3,
      "fecha": "2023-03-10",
      "costo": 300,
      "cantidad": 3,
      "nombreCliente": "Pedro Rodríguez",
      "producto": "Uvas"
    },
    {
      "id": 4,
      "fecha": "2023-03-11",
      "costo": 400,
      "cantidad": 4,
      "nombreCliente": "Ana López",
      "producto": "Plátanos"
    },
    {
      "id": 5,
      "fecha": "2023-03-12",
      "costo": 500,
      "cantidad": 5,
      "nombreCliente": "Luis Martínez",
      "producto": "Naranjas"
    },
    {
      "id": 6,
      "fecha": "2023-03-13",
      "costo": 600,
      "cantidad": 6,
      "nombreCliente": "Sara Gómez",
      "producto": "Manzanas"
    },
    {
      "id": 8,
      "fecha": "2023-03-14",
      "costo": 700,
      "cantidad": 7,
      "nombreCliente": "David Hernández",
      "producto": "Pan"
    },
    {
      "id": 9,
      "fecha": "2023-03-14",
      "costo": 700,
      "cantidad": 7,
      "nombreCliente": "David Hernández",
      "producto": "Peras"
    },
    {
      "id": 10,
      "fecha": "2023-03-14",
      "costo": 700,
      "cantidad": 7,
      "nombreCliente": "David Hernández",
      "producto": "Peras"
    }
  ]

  const handleClientSelection = (value) => {
    setSelectedClient(value);
  };
  console.log(selectedClient);


  return (
    <View style={styles.container}>
      <Controller
            name="cliente"
            control={control}
            render={({ field }) => (
              <Picker 
                selectedValue={selectedClient}
                onValueChange={(value)=> handleClientSelection(value)}
                style={styles.picker}
              >
                <Picker.Item label="todos" value="todos" />
                {boletas?.map((p) => (
                  <Picker.Item key={p.id} label={p.nombreCliente} value={p.nombreCliente} />
                ))}
              </Picker>
            )}
          />
      <View style={styles.clientList}>
        <FlatList
          data={boletas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            if (selectedClient==="todos"||selectedClient===item.nombreCliente) {
              return (
              <Recibo item={item}/>
            )}}
            }
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
  picker: {
    marginTop: 100,
    marginBottom: 20,
    height: 40,
    width: '100%',
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 8,
    width: '80%'

  },  
  clientList: {
    width: '80%',
  },


});

export default Boletas;
