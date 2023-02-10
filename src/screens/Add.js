/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import check from '../assets/check.png';
import spaceship from '../assets/spaceship.png';
import spacecapsule from '../assets/spacecapsule.png';
import satellite from '../assets/satellite.png';
import plane from '../assets/plane.png';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
//componentes de firestore para alojamiento en la nube
import firestore from '@react-native-firebase/firestore';

//importacion de componentes
import GlobalStyle from '../components/GlobalStyle';
import CustomButton from '../components/CustomButton';

export default function Add({navigation}) {

  //creacion del estados y variables a utilizar
  //variable para traer los datos de redux
  const {spaceShips, spaceShipId, newSpaceShip} = useSelector(
    state => state.spaceShipReducer,
  );
  const dispatch = useDispatch();
 // Definicios de propiedades del elemento
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('');
  const [type, setType] = React.useState('');
  const [speed, setSpeed] = React.useState('');
  const [destination, setDestination] = React.useState('');

  
  

  //funcion para fuardar datos en el async storage al dar click en guardar
  const onSave = async () => {

    if(newSpaceShip){
      await firestore().collection('SpaceShips').add({
        Name: name,
        Color: color,
        Type: type,
        Speed: speed,
        Destination: destination
      });
    }else{
      
      await firestore().collection('SpaceShips').doc(spaceShipId).update({
        Name: name,
        Color: color,
        Type: type,
        Speed: speed,
        Destination: destination
      });
    }
    Alert.alert('Exitoso!!', 'Nave guardada exitosamente');
    navigation.goBack();
    
    
  };

  //funcion para retornar la info de la nave en caso de seleccion de seleccionar una
  const getSpaceShip = () => {
    
    const SpaceShip = spaceShips.find(item => item.Id === spaceShipId);
    
    if (newSpaceShip=== false) {
      setName(SpaceShip.Name);
      setColor(SpaceShip.Color);
      setType(SpaceShip.Type);
      setSpeed(SpaceShip.Speed);
      setDestination(SpaceShip.Destination);
    }
  };
  //funcion para sobreescribir la carga de la pantalla
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSpaceShip();
    });
  }, []);

  return (
    
      <View style={GlobalStyle.body}>
        <ScrollView
          style={styles.container}
        >
        
        <Text style={GlobalStyle.title}>Agrega una nueva nave</Text>
        <Text style={GlobalStyle.subtitle}>Ingresa un Nombre:</Text>
        <TextInput
          onChangeText={text => setName(text)}
          placeholder="Nombre de la nave"
          style={styles.inputBox}
          value={name}
        />
        <Text style={GlobalStyle.subtitle}>Elige un color</Text>
        <View style={styles.color_bar}>
          <TouchableOpacity
            style={styles.color_white}
            onPress={() => {
              setColor('white');
            }}>
            {color === 'white' && <Image style={styles.check} source={check} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_red}
            onPress={() => {
              setColor('red');
            }}>
            {color === 'red' && <Image style={styles.check} source={check} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_blue}
            onPress={() => {
              setColor('blue');
            }}>
            {color === 'blue' && <Image style={styles.check} source={check} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_green}
            onPress={() => {
              setColor('green');
            }}>
            {color === 'green' && <Image style={styles.check} source={check} />}
          </TouchableOpacity>
        </View>

        <Text style={GlobalStyle.subtitle}>Selecciona el tipo de nave</Text>
        <View style={styles.selection}>
          <TouchableOpacity
            style={
              type === 'Lanzadera'
                ? {backgroundColor: 'gray', borderRadius: 5}
                : {backgroundColor: 'white'}
            }
            onPress={() => {
              setType('Lanzadera');
            }}>
            <Image style={styles.icon} source={spaceship} />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'Tripulada'
                ? {backgroundColor: 'gray', borderRadius: 5}
                : {backgroundColor: 'white'}
            }
            onPress={() => {
              setType('Tripulada');
            }}>
            <Image style={styles.icon} source={spacecapsule} />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'No Tripulada'
                ? {backgroundColor: 'gray', borderRadius: 5}
                : {backgroundColor: 'white'}
            }
            onPress={() => {
              setType('No Tripulada');
            }}>
            <Image style={styles.icon} source={satellite} />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'Avion'
                ? {backgroundColor: 'gray', borderRadius: 5}
                : {backgroundColor: 'white'}
            }
            onPress={() => {
              setType('Avion');
            }}>
            <Image style={styles.icon} source={plane} />
          </TouchableOpacity>
        </View>
        <Text style={GlobalStyle.subtitle}>{type}</Text>
        <Text style={GlobalStyle.subtitle}>Velocidad Km/h</Text>
        <TextInput
          onChangeText={text => setSpeed(text)}
          placeholder="Velocidad"
          style={styles.inputBox}
          keyboardType="number-pad"
          value={speed}
        />
        <Text style={GlobalStyle.subtitle}>Destino</Text>
        <TextInput
          onChangeText={text => setDestination(text)}
          placeholder="Destino de la nave"
          style={styles.inputBox}
          value={destination}
        />
        </ScrollView>
        
        <CustomButton
        title='Guardar'
        onPressFunction={() => {
          onSave();
        }}
      />
      </View>
    
  );
}
//Hoja de estilos propia de la pantalla
const styles = StyleSheet.create({
  
  container: {
    
    backgroundColor: '#ffffff',
    alignContent:'center',
    marginBottom:60,
  },


  inputBox: {
    width: '80%',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  color_bar: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  check: {
    flex: 1,
    width: 20,
    height: 20,
    resizeMode: 'center',
  },
  selection: {
    flexDirection: 'row',
    width: '90%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 90,
    height: 90,
    resizeMode: 'center',
  },

});
