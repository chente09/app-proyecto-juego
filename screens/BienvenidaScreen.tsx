import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function BienvenidaScreen() {
  const [insecto, setinsecto] = useState("");
  const [dificultad, setdificultad] = useState("");
  const [levelview, setlevelview] = useState(false);
  const [mapview, setmapview] = useState(false);
  const [scoreview, setscoreview] = useState(false);
  const [toptenDatos, setToptenDatos] = useState([]);
  const [logged, setlogged] = useState(false);
  const [nick, setnick] = useState("");
  const [userimg, setuserimg] = useState("https://t4.ftcdn.net/jpg/05/10/14/15/240_F_510141519_evdfo5bdjlaMmrlyCCMzcO4LID6doX6W.jpg");
  let focusListener:any = null;
  return (
    <View>
          <ImageBackground
      source={require('../assets/image/fondo-bienv4r3.jpg')}
      style={styles.container}
  
    >
      <Text></Text>
      <Pressable  style={styles.perfiltouch}>
      
        <View style={styles.circleContainer}>
          <Image source={{ uri: userimg }} style={styles.profileImage} />
        </View>
        <Text style={styles.textbutton1}>Perfil</Text>
        
        </Pressable>

      <Text style={styles.subtitulo}>Escoje el insecto que quieres aplastar!!</Text>
      <View>
        <TouchableOpacity style={styles.btn} >
          <Text style={styles.textbutton}>Hormiga 🐜</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} >
          <Text style={styles.textbutton}>Abeja 🐝</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.textbutton}>Araña 🕷️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} >
          <Text style={styles.textbutton}>Cucaracha 🪳</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} >
          <Text style={styles.textbutton}>Escarabajo 🪲</Text>
        </TouchableOpacity>
      
        <Text></Text>
        <Text></Text>
        <TouchableOpacity style={styles.btnscore} >
                  <Text style={styles.textbtn}>Puntuaciones</Text>
        </TouchableOpacity>
      </View>
    
      
    </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center'
  },
  perfiltouch:{
    //top:20,
    left:130,
    marginTop:20,
    width:70,
    height:90,
    //backgroundColor:'#C0448F'
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
  btn:{
    width:150,
    height:35,
    alignItems:'center',
    verticalAlign:'middle',
    marginVertical:20,
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
    //flex:0.4,
    marginTop: 20,
    fontSize: 25,
    color: "#FF0800",
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal:40,
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
    //top:5,
    left:15
  },
  btnscore: {
    paddingVertical:7,
    paddingHorizontal:15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor:'#64B5F6'
  },
})