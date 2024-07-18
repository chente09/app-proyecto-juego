import { Alert, Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [fontsLoaded] = useFonts({
    pixel: require("../assets/fonts/pixel.ttf"),
  });

  useEffect(() => {
    // Limpiar campos cuando se monta el componente
    setCorreo("");
    setContrasenia("");
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Bienvenida2');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        let titulo = '';
        let mensaje = '';

        switch (errorCode) {
          case 'auth/invalid-email':
            titulo = 'Correo inválido';
            mensaje = 'Revisar que el email sea el correcto';
            break;
          case 'auth/invalid-credential':
            titulo = 'Error de Usuario';
            mensaje = 'El usuario no se encuentra registrado';
            break;
          case 'auth/missing-password':
            titulo = 'Error en Contraseña';
            mensaje = 'La contraseña es incorrecta';
            break;
          default:
            titulo = 'Error';
            mensaje = 'Revisar credenciales';
            break;
        }

        console.log(errorCode);
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/iniciosesion.jpeg")}
        style={[styles.imgbackground, styles.fixed, { zIndex: -1 }]}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardContainer}
        contentContainerStyle={styles.keyboardContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>BIENVENIDO!</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresar Correo"
          onChangeText={(texto) => setCorreo(texto)}
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar Contraseña"
          onChangeText={(texto) => setContrasenia(texto)}
          value={contrasenia}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.textbutton}>INGRESAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={styles.textbutton}>REGISTRARME</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  imgbackground: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    resizeMode: "cover",
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btn: {
    width: 100,
    height: 40,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "rgb(89,166,98)",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn1: {
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "#B0BF1A",
    borderRadius: 5,
  },
  btn2: {
    width: 100,
    height: 40,
    alignItems: "center",
    verticalAlign: 'middle',
    marginVertical: 10,
    backgroundColor: "#f25022",
    justifyContent: "center",
    borderRadius: 5,
  },
  textbutton: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  titulo: {
    marginTop: 230,
    fontSize: 30,
    color: "#ffb900",
    textAlign: "center",
    marginBottom: 50,
    fontFamily: "pixel",
  },
  input: {
    width: "70%",
    height: 45,
    marginBottom: 30,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#eee",
    paddingLeft: 20,
  },
  keyboardContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  keyboardContentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
