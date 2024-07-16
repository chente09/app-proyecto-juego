import 'react-native-gesture-handler';
import { Alert, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { stylesGlobal } from '../theme/appTheme';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { ref, set } from 'firebase/database';

export default function RegistroScreen({navigation}:any) {
  
  const [nombre, setnombre] = useState('')
  const [apellido, setapellido] = useState('')
  const [edad, setedad] = useState('')
  const [usuario, setusuario] = useState('')
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  const registro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;
      console.log('Registro Exitoso');
      Alert.alert('Registro', 'Registro Exitoso')

      // Guardar información Firebase
      set(ref(db, 'usuarios/' + usuario), {
        firstName: nombre,
        lastName: apellido,
        age:edad,
        email:correo
      });

      navigation.navigate("Login");

    } catch (error:any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      switch (errorCode) {
        case "auth/invalid/credential":
          Alert.alert("Error", "Las Credenciales son Incorrectas");
          break;
        case "auth/missing-password":
          Alert.alert("Error", "Ingrese la contraseña");
          break;
        case "auth/missing-email":
          Alert.alert("Error", "Ingrese el Correo");
          break;
        default:
          Alert.alert(errorCode, errorMessage);
          console.error(error);
          break;
      }
    }
    
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/fondo-bienv2.jpg")}
        style={[styles.imgbackground, styles.fixed, { zIndex: -1 }]}
      >
      </ImageBackground>

      <Text style={styles.titulo}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingrese su Nombre'
        onChangeText={(texto)=>setnombre(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingrese su Apellido'
        onChangeText={(texto)=>setapellido(texto)}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Ingrese su Edad'
        onChangeText={(texto)=>setedad(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingrese su Usuario'
        onChangeText={(texto)=>setusuario(texto)}
      />
      <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='Ingrese su Correo'
        onChangeText={(texto)=>setcorreo(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingrese su Contraseña'
        onChangeText={(texto)=>setcontrasenia(texto)}
      />
      <TouchableOpacity style={stylesGlobal.btn} onPress={()=> registro()}>
        <View >
          <Text style={styles.text}>Registrar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={stylesGlobal.btn}onPress={()=> navigation.navigate('Login')}>
        <View >
          <Text style={styles.text}>Regresar</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'#c8b9b1f7',
    borderRadius:40,
    height:20,
    width:'60%',
  },
  container:{
    flex:1,
    color:'white',
    fontSize:20, 
    alignItems:'center',
    justifyContent:'center',
    paddingTop:50
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

  titulo: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 60,
    color:'#2E3531'
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
})