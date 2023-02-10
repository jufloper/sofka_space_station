//Este componente nos permite reutilizar el codigo para los botones en las diferentes pantallas de la app

import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import GlobalStyle from './GlobalStyle';

const CustomButton = props => {
    
  //se retorna el objeto como CustomButton y permite aggregar nuevos estylos desde el llamado

  return (
    <TouchableOpacity
      style={[styles.button, {...props.customStyle}]}
      onPress={props.onPressFunction}
    >
      <Text style={GlobalStyle.CustomButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#ffcc33',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 10,
    bottom: 10,
    right: 20,
    left: 20,
  },
});

export default CustomButton;
