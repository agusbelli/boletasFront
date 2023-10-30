import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './views/inicio';
import CargarViaje from './views/cargarViaje';
import SeleccionaCliente from './views/seleccionaCliente';
import { Provider } from 'react-redux';
import store from './redux/store';
import Registros from './views/registros';
import GeneraBoleta from './views/GeneraBoleta';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Selecciona un Cliente" component={SeleccionaCliente} />
          <Stack.Screen name="Cargar Viaje" component={CargarViaje} />
          <Stack.Screen name="Registros" component={Registros} />
          <Stack.Screen name="Boletas" component={GeneraBoleta} />
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}