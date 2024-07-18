import { ImageBackground, StyleSheet, Text, View, Image, Pressable, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { get, onValue, ref } from 'firebase/database';
import { useFonts } from 'expo-font';
import { Modal } from 'react-native';

export default function BienvenidaScreen({ navigation }: any) {
  const [logged, setlogged] = useState(false);
  const [usuario, setusuario] = useState("");
  const [userimg, setuserimg] = useState("https://t4.ftcdn.net/jpg/05/10/14/15/240_F_510141519_evdfo5bdjlaMmrlyCCMzcO4LID6doX6W.jpg");
  let focusListener: any = null;
  const [toptenDatos, setToptenDatos] = useState([]);
  const [insecto, setinsecto] = useState("");
  const [levelview, setlevelview] = useState(false);
  const [mapview, setmapview] = useState(false);
  const [scoreview, setscoreview] = useState(false);

  function cerrarSesion() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("Mensaje", "Se cerró la sesión");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        const displayName: any = user.displayName;
        setusuario(displayName);
        setlogged(true)
        if (user.photoURL == null) {
          setuserimg("https://cdn-icons-png.flaticon.com/512/12595/12595885.png");
        } else {
          const photoURL: any = user.photoURL;
          setuserimg(photoURL);
        }

        //console.log("Este es el nick: ", nick)
      } else {
        // User is signed out
        console.log("Usuario desconectado");
        setlogged(false)
      }
    });

    focusListener = navigation.addListener('focus', () => {
      const user = auth.currentUser;
      if (user != null) {
        //console.log('actualizando')
        if (user.photoURL == null) {
          setuserimg("https://cdn-icons-png.flaticon.com/512/12595/12595885.png");
        } else {
          const photoURL: any = user.photoURL;
          setuserimg(photoURL);
        }
      }
    });

    return () => {
      // Desuscribe la función cuando el componente se desmonta
      unsubscribe();
    };
  }, []);

  // LEER DATOS
  useEffect(() => {
    const leer = async () => {
      try {
        const starCountRef = ref(db, "puntuaciones/");

        // Usamos onValue para suscribirnos a cambios en la base de datos
        onValue(starCountRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const dataTemp: any = Object.keys(data).map((id) => ({
              id,
              ...data[id],
            }));
            //ordeno de mayor a menor
            const sortedData: any = [...dataTemp].sort((a, b) => b.score - a.score);
            //obtengo las 10 puntuaciones mas altas
            const primerosDiezElementos = sortedData.slice(0, 10);
            setToptenDatos(primerosDiezElementos);
          } else {
            console.error('No hay datos en la referencia.');
          }
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    leer();
  }, []);

  //Importar fonts
  const [fontsLoaded] = useFonts({
    'pixel': require('../assets/fonts/pixel.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  type puntuacion = {
    id: any;
    user: string;
    score: number;
  };
  type infojuego = {
    name: string,
    map: string
  }
  const asignarValores = (mapa: string) => {
    const gameobject: infojuego = {
      name: insecto,
      map: mapa
    }
    navigation.navigate('Juego', gameobject)
    setlevelview(false);
    setmapview(false);
  }
  const renderSeparator = () => (
    <View style={styles.separator} />
  );
  //FUNCION PARA LA EXCEPCION DE OFFLINE
  function userisLogged() {
    if (logged) {
      return navigation.navigate('Perfil');
    }
    else {
      return navigation.navigate('Offline');
    }
  }

  return (
    <ImageBackground source={require('../assets/image/full.jpg')} style={styles.container}>
      <Text></Text>
        <Text></Text>
        <TouchableOpacity style={styles.btnscore} onPress={() => setscoreview(true)}>
          <Text style={styles.textbtn}>Puntuaciones</Text>
        </TouchableOpacity>
        <Pressable style={styles.btnsalir} onPress={() => cerrarSesion()}>
            <Text style={styles.textbtn}>Salir</Text>
          </Pressable>
      {scoreview && (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <ImageBackground source={require("../assets/image/modal-score1.jpg")} style={styles.modalmapView}>
              <Text style={styles.scoretitle}>Top 10 score:</Text>
              <View style={styles.flat1}>
                <FlatList
                  data={toptenDatos}
                  renderItem={({ item, index }: { item: puntuacion; index: number }) => (
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                      <Text style={styles.keytext}>{`${index + 1}. User:`}<Text style={styles.valuetext}> {item.user}</Text> </Text>
                      <Text style={styles.keytext}>  Score:<Text style={styles.valuetext}> {+item.score}</Text> </Text>
                    </View>
                  )}
                  ItemSeparatorComponent={renderSeparator}
                  style={styles.lista}
                />
              </View>
              <Pressable style={styles.btnback} onPress={() => setscoreview(false)}>
                <Text style={styles.textbtn}>Regresar</Text>
              </Pressable>
            </ImageBackground>
          </View>
        </Modal>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.textbutton}>Perfil</Text>
          <FontAwesome name="user-circle-o" size={70} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.textbutton}>PLAY</Text>
          <Image style={styles.img2} source={require('../assets/image/INSECT.png')} />
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
  subtitulo: {
    //flex:0.4,
    marginTop: 20,
    fontSize: 25,
    color: "#FF0800",
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,
    fontFamily: 'pixel'
  },
  separator: {
    height: 0.5,
    backgroundColor: 'white',
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: 'white'
  },
  perfiltouch: {
    left: 130,
    marginTop: 20,
    width: 70,
    height: 90,
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
  },
  textbutton1: {
    fontSize: 18,
    color: '#002387',
    fontWeight: 'bold',
    left: 15
  },
  btnscore: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#e3ae45'
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  levelbtn: {
    width: 100,
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 5,
    shadowOffset: { width: 1, height: 13 },
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 1,
    elevation: 10
  },
  leveltitle: {
    marginTop: 10,
    fontSize: 25,
    fontFamily: 'pixel',
    color: "#FF9800",
    textAlign: 'center',
    marginBottom: 30
  },
  containbtn: {
    alignItems: 'center'
  },
  modalView: {
    height: 400,
    width: 300,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    overflow: 'hidden'
  },
  btnback: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#00a4ef'
  },
  modalmapView: {
    height: 720,
    width: 350,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    overflow: 'hidden',
  },
  keytext: {
    color: '#FFEE58',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  valuetext: {
    color: 'white',
    fontWeight: 'normal',
    fontStyle: 'normal'
  },
  lista: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  flat1: {
    height: 500,
  },
  scoretitle: {
    marginTop: 55,
    fontSize: 25,
    fontFamily: 'pixel',
    color: "#F39C12",
    textAlign: 'center',
    marginBottom: 5
  },
  btnsalir: {
    width: 120,
    height: 40,
    backgroundColor: "red",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
})