//importe de componentes de react
import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSpaceShipId, setSpaceShip, setNewSpaceShip} from '../redux/actions';

//Importe de componentes
import GlobalStyle from '../components/GlobalStyle';
import CustomButton from '../components/CustomButton';

//imagenes de tipos de naves
import img_astronauta from '../assets/astronauta.png';
import img_spaceship from '../assets/spaceship.png';
import img_spacecapsule from '../assets/spacecapsule.png';
import img_satellite from '../assets/satellite.png';
import img_plane from '../assets/plane.png';

//componentes de firestore para alojamiento en la nube
import firestore from '@react-native-firebase/firestore';



// default aplication a exportar
export default function Home({navigation}) {
  //definicion de stados y variables generales
  const {spaceShips, spaceShipId} = useSelector(
    state => state.spaceShipReducer
  );
  const dispatch = useDispatch();
  //estado para almacenar la busqueda
  const [searchTerm, setSearchTerm] = React.useState('');
  //funciones ------
  


  

  //Ejecucion con cualquier cambio de estado en el elemento
  React.useEffect(() => {
    getSpaceShips();
    
  }, []);

  
 //Funcion para  almacenar en searchTerm los caracteres intorducidos en la barra de busqueda 
  const onChangeSearch = text => {
    setSearchTerm(text);
  };
//definicion del array filteredData, se realiza comparacion de los caracteres almacenados en el estado searchTerm
const filteredData = spaceShips.filter((item) =>
item.Name.toLowerCase().includes(searchTerm.toLowerCase())
)
//Funcion para eliminar una nave
  const deleteSpaceShip = async id => {
    
    await firestore().collection('SpaceShips').doc(id).delete().then(()=>{
      Alert.alert('Exitoso!', 'Nave ha sido dada de baja');
      getSpaceShips();
    });
  };

  // Funcion para retornar la imagen segun el item.type que retorne
  const getShipImage = value => {
    let img = img_astronauta;
    switch (value) {
      case 'Lanzadera':
        img = img_spaceship;
        break;
      case 'Tripulada':
        img= img_spacecapsule;
        break;
      case 'No Tripulada':
        img= img_satellite;
        break;
      case 'Avion':
        img= img_plane;
        break;
    }

    return <Image style={styles.itemImage} source={img} />
  }

  //recuperar objetos de firestore hacia el redux
  const getSpaceShips = () => {
    
    firestore().collection('SpaceShips').onSnapshot(querySnapShot =>{
      var list=[];
      querySnapShot.forEach(doc => {
        const { Name, Color, Type, Speed, Destination } = doc.data();
         list.push({
          Id: doc.id,
          Name, 
          Color, 
          Type, 
          Speed, 
          Destination 
        });
        
      });
      dispatch(setSpaceShip(list));
        
      
    });
  };

  //Retorno de la vista
  return (
    //View principal, estilo almacenado en src/components/GlobalStyle.js
    <View style={GlobalStyle.body}>
      <TextInput
        placeholder="Busqueda de naves"
        onChangeText={onChangeSearch}
        value={searchTerm}
      />
      
      
      <FlatList
        style={styles.flatList}
        data={filteredData}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setSpaceShipId(item.Id));
              dispatch(setNewSpaceShip(false));
              navigation.navigate('Agregar Nave');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : '#ffffff',
                  },
                  styles.color,
                ]}
              />

              <View style={styles.item_body}>
                <Text style={GlobalStyle.title}>Nave: {item.Name}</Text>
                <Text style={GlobalStyle.subtitle} numberOfLines={1}>
                  Destino: {item.Destination}
                </Text>
              </View>
              <View>{getShipImage(item.Type)}</View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteSpaceShip(item.Id);
                }}>
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomButton
        title='Nueva Nave'
        onPressFunction={() => {
          
          dispatch(setNewSpaceShip(true));
          navigation.navigate('Agregar Nave');
        }}
      />
    </View>
  );
}

//estilos propios de la pantalla Home
const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
 
  flatList:{
    marginBottom:25,
  },

  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    borderRadius:5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'900',
  },
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    resizeMode: 'center',
  },
});
