import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
       source={require("../assets/image/iniciosesion.jpeg")}
       style={[styles.imgbackground, styles.fixed, { zIndex: -1 }]}
      >
      </ImageBackground>
      <Text>INICIO DE SESION</Text>
      <TextInput
        placeholder='Ingresar Correo'
        keyboardType='email-address'
      />
      <TextInput
        placeholder='Ingresar Contraseña'
        secureTextEntry
      />
      <TouchableOpacity>
        <Text>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
      <Text>Regresar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  imgbackground: {
    width: Dimensions.get("screen").width, //for full screen
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

})