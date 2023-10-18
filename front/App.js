import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './views/inicio';
import Boletas from './views/boletas';
import CargarViaje from './views/cargarViaje';
import SeleccionaCliente from './views/seleccionaCliente';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Selecciona un Cliente" component={SeleccionaCliente} />
      <Stack.Screen name="Cargar Viaje" component={CargarViaje} />
      <Stack.Screen name="Boletas" component={Boletas} />
    </Stack.Navigator>
  </NavigationContainer>  );
}