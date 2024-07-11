import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../theme/appTheme'
import Navegador from '../navigators/BottomNavigator';

export default function LoginScreen({navigation}:any) {
  return (
    <View style={styles.container}>
      <ImageBackground
       source={require("../assets/image/iniciosesion.jpeg")}
       style={[styles.imgbackground, styles.fixed, { zIndex: -1 }]}
      >
      </ImageBackground>
      <Text style={styles.titulo}>INICIO DE SESION</Text>
      <TextInput
        placeholder='Ingresar Correo'
        keyboardType='email-address'
        style={styles.input}
      />
      <TextInput
        placeholder='Ingresar Contraseña'
        secureTextEntry
        style={styles.input}
      />
      <View >
      <TouchableOpacity 
        style={stylesGlobal.btn}
        onPress={()=> navigation.navigate('Bienvenida2')}>
        <Text style={styles.text}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={stylesGlobal.btn}
        onPress={()=> navigation.navigate('Registro')}>
        <Text style={styles.text}>Registrar</Text>
      </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    color:'white',
    fontSize:20, 
    alignItems:'center',
    justifyContent:'center'
  },

  imgbackground: {
    width: Dimensions .get("screen").width, //for full screen
    height: Dimensions.get("screen").height, //for full screen
    resizeMode:"cover",
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text:{
    color:'white',
    fontSize:20
  },

  input:{
    width: "80%",
    height: 45,
    marginBottom: 30,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#eee",
    paddingLeft: 20,
  },

  titulo: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 130,
    marginBottom: 50,
    color:'white'
  }
})