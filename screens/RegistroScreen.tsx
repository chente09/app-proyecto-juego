import 'react-native-gesture-handler';
import { Alert, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { stylesGlobal } from '../theme/appTheme';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../config/Config';
import { ref, set } from 'firebase/database';
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, uploadBytes, ref as reff } from 'firebase/storage';

export default function RegistroScreen({navigation}:any) {
  
  const [nombre, setnombre] = useState('')
  const [apellido, setapellido] = useState('')
  const [edad, setedad] = useState('')
  const [usuario, setusuario] = useState('')
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')
  const [imagen, setImagen] = useState(" ");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      //console.log(imagen);
    }
  };

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

      if (imagen!=" ") {
        //subir la imagen al storage
        const storageRef = reff(storage, "usuarios/" + usuario); 
        try {
          const response = await fetch(imagen);
          const blob = await response.blob();
          await uploadBytes(storageRef, blob, {
            contentType: "image/jpg",
          });
          console.log("La imagen se subió con éxito");
          // Obtener la URL de la imagen
          const imageUrl = await getDownloadURL(storageRef);

          // subir el link de la imagen al profile del usuario
          await updateProfile(user, {
            photoURL: imageUrl,
          });
        } catch (error: any) {
          console.error(error.message);
        }
      }
      await updateProfile(user, {
        displayName: usuario,
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
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.boton}>
          <Text style={styles.textoBoton}>sube una imagen de perfil</Text>
        </TouchableOpacity>

        {imagen && (
          <View>
            <Image source={{ uri: imagen }} style={styles.imagen} />
          </View>
        )}
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
      </ScrollView>
      <TouchableOpacity style={styles.btn2} onPress={()=> registro()}>
        <View >
          <Text style={styles.text}>Registrar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn2}onPress={()=> navigation.navigate('Login')}>
        <View >
          <Text style={styles.text}>Regresar</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll:{
    width:'80%',
    
    marginTop:20,
  },
  contentContainer:{
    justifyContent:'center',
    alignItems:'center'
  },

  btn:{
    backgroundColor:'#c8b9b1f7',
    borderRadius:40,
    height:20,
    width:'60%',
  },

  btn2: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },

  container:{
    flex:1,
    color:'white',
    fontSize:20, 
    alignItems:'center',
    justifyContent:'center',
    paddingTop:100,
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

  boton: {
    backgroundColor: "#C41E3A",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  imagen: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 15,
  },

  textoBoton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
})