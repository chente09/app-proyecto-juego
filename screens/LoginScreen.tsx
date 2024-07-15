import { Alert, Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { stylesGlobal } from '../theme/appTheme'
import Navegador from '../navigators/BottomNavigator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({navigation}:any) {

  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  function login(){
    signInWithEmailAndPassword(auth, correo, contrasenia)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log('Ingreso Exitoso');
      navigation.navigate('BottomTab')

    })
    .catch((error) => {
      console.log(error.code);
    
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case "auth/invalid/credential":
          Alert.alert("Error", "Las credenciales son incorrectas");
          break;
        case "auth/missing-password":
          Alert.alert("Error", "Falta contraseña");
          break;
        case "auth/invalid-email":
          Alert.alert("Error", "Ingrese un correo valido");
          break;
        default:
          Alert.alert("Error", "Contactenos");
          break;
      }
    });

    setcorreo('')
    setcontrasenia('')
  }

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
        onChangeText={(texto)=>setcorreo(texto)}
        value={correo}
      />
      <TextInput
        placeholder='Ingresar Contraseña'
        secureTextEntry
        style={styles.input}
        onChangeText={(texto)=>setcontrasenia(texto)}
        value={contrasenia}
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
    color:'#ffb900'
  }
})