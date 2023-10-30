import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Inicio = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boletas App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Selecciona un Cliente')}>
          <Text style={styles.buttonText}>Cargar Viaje +</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Registros')}>
          <Text style={styles.buttonText}>Registros</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Boletas')}>
          <Text style={styles.buttonText}>Descargar Boleta ⬇</Text>
        </TouchableOpacity>
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
    backgroundColor:  'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: primaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: primaryColor,
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: secondaryColor,
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;
