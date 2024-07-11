import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Profile = ({ userimg }:{userimg:any}) => (
  <Pressable style={styles.perfiltouch}>
    <View style={styles.circleContainer}>
      <Image source={{ uri: userimg }} style={styles.profileImage} />
    </View>
    <Text style={styles.textbutton1}>Perfil</Text>
  </Pressable>
);

const InsectButton = ({ insect }:{insect:any}) => (
  <TouchableOpacity style={styles.btn}>
    <Text style={styles.textbutton}>{insect}</Text>
  </TouchableOpacity>
);

const ScoreButton = () => (
  <TouchableOpacity style={styles.btnscore}>
    <Text style={styles.textbtn}>Puntuaciones</Text>
  </TouchableOpacity>
);

export default function BienvenidaScreen() {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/fondo-bienv4r3.jpg')}
        style={styles.background}
      >

        <Text style={styles.subtitulo}>Escoje el insecto que quieres aplastar!!</Text>
        <View>
          {["Hormiga 🐜", "Abeja 🐝", "Araña 🕷️", "Cucaracha 🪳", "Escarabajo 🪲"].map((insect, index) => (
            <InsectButton key={index} insect={insect} />
          ))}

          <ScoreButton />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  perfiltouch: {
    left: 130,
    marginTop: 20,
    width: 70,
    height: 90,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 150,
    height: 35,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'rgb(89,166,98)',
    paddingTop: 5,
    borderRadius: 15
  },
  textbutton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  subtitulo: {
    marginTop: 20,
    fontSize: 25,
    color: "#FF0800",
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,
    fontFamily: 'pixel'
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  textbutton1: {
    fontSize: 18,
    color: '#002387',
    fontWeight: 'bold',
    paddingLeft: 15
  },
  btnscore: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#64B5F6'
  },
})
