import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Inicio = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boletas App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('CargarViaje')}>
          <Text style={styles.buttonText}>Cargar Viaje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Boletas')}>
          <Text style={styles.buttonText}>Boletas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Formulario')}>
          <Text style={styles.buttonText}>Formlulario</Text>
        </TouchableOpacity>
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
