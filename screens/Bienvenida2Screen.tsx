import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Navegador from '../navigators/BottomNavigator';
import { stylesGlobal } from '../theme/appTheme';

export default function BienvenidaScreen({navigation}:any) {
  return (
    <ImageBackground source={require('../assets/image/full.jpg')} style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.Navegador('BottomTab')}>
          <Text style={styles.textbutton}>PLAY</Text>
          <Image style={styles.img2} source={require('../assets/image/INSECT.png')}/>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  titulo: {
    marginTop: 90,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C41E3A',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra los elementos horizontalmente
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  btn: {
    width: 105,
    height: 130,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
    borderRadius: 5,
    marginHorizontal: 10, // Ajusta el espacio horizontal entre los botones
  },
  textbutton: {
    fontSize: 15,
    color: 'rgb(0,255,30)',
    fontWeight: 'bold',
  },
  img2: {
    width: 80, // Ajusta el tamaño de la imagen según sea necesario
    height: 80, // Ajusta el tamaño de la imagen según sea necesario
    marginBottom: 20,
  },
  img3: {
    width: 80, // Ajusta el tamaño de la imagen según sea necesario
    height: 80, // Ajusta el tamaño de la imagen según sea necesario
    marginBottom: 20,
  },
  img1: {
    width: 80, // Ajusta el tamaño de la imagen según sea necesario
    height: 80, // Ajusta el tamaño de la imagen según sea necesario
    marginBottom: 20,
  },
})