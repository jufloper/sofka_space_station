/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//se importan las pantallas desde screens
import Home from './screens/Home';
import Add from './screens/Add';
import {Provider} from 'react-redux';
import {Store} from './redux/store';

//creacion del navigator como Stack
const Stack = createNativeStackNavigator();

//funcion para retornar el codigo de stack navigator 
function MyStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Agregar Nave"
        component={Add}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MyStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
