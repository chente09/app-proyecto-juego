import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../theme/appTheme'

export default function LoginScreen({navigation}:any) {
  return (
    <View style={styles.container}>
      <ImageBackground
       source={require("../assets/image/iniciosesion.jpeg")}
       style={[styles.imgbackground, styles.fixed, { zIndex: -1 }]}
      >
      </ImageBackground>
      <Text style={styles.text}>INICIO DE SESION</Text>
      <TextInput
        placeholder='Ingresar Correo'
        keyboardType='email-address'
      />
      <TextInput
        placeholder='Ingresar Contraseña'
        secureTextEntry
      />
      <View style={stylesGlobal.btn}>
      <TouchableOpacity onPress={()=> navigation.navigate('BottomTab')}>
        <Text style={styles.text}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.navigate('BottomTab')}>
        <Text style={styles.text}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.navigate('Registro')}>
      <Text style={styles.text}>Regresar</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    color:'white',
    fontSize:20
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
  }

})