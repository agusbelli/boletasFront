import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Boletas = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
    // Agrega más clientes según sea necesario
  ];

  const handleClientSelection = (client) => {
    setSelectedClient(client);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis boletas</Text>
      <View style={styles.clientList}>
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.clientItem,
                item.id === selectedClient?.id && styles.selectedClientItem,
              ]}
              onPress={() => handleClientSelection(item)}
            >
              <Text style={styles.clientName}>{item.name}</Text>
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
    backgroundColor: '#FAF3E0', // Fondo color crema
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
  selectedClientItem: {
    backgroundColor: primaryColor,
  },
  clientName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Boletas;
