import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/base';

type InsectName = 'hormiga' | 'abeja' | 'araña' | 'cucaracha' | 'escarabajo' | 'blood';
type MapName = 'hormiguero' | 'panal' | 'telaraña' | 'estanque' | 'jardin';

interface Insect {
  name: InsectName;
  map: MapName;
}

const insectImages: Record<InsectName, any> = {
  hormiga: require('../assets/image/hormiga2.png'),
  abeja: require('../assets/image/abeja.png'),
  araña: require('../assets/image/araña3.png'),
  cucaracha: require('../assets/image/cucaracha.png'),
  escarabajo: require('../assets/image/escarabajo.png'),
  blood: require('../assets/image/bloodsplash.png'),
};

const mapImages: Record<MapName, any> = {
  hormiguero: require('../assets/image/fondo-hormiguero.jpg'),
  panal: require('../assets/image/fondo-panal2.jpg'),
  telaraña: require('../assets/image/fondo-telaraña3.jpg'),
  estanque: require('../assets/image/fondo-estanque.jpg'),
  jardin: require('../assets/image/fondo-jardin.jpg'),
};

const GameScreen = ({ route, navigation }: { route: { params: Insect }; navigation: any }) => {
  const insecto = route.params;

  const [objects, setObjects] = useState<Array<{ id: number; img: any; x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30); // Tiempo en segundos
  const [gameOver, setGameOver] = useState(false);
  const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });
  const [isPaused, setIsPaused] = useState(false);

  const insectImg = insectImages[insecto.name];
  const mapImg = mapImages[insecto.map];

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setViewDimensions({ width, height });
  };

  useEffect(() => {
    if (time === 0) {
      setGameOver(true);
      setObjects([]);
    }

    const interval = setInterval(() => {
      if (!isPaused && !gameOver) {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, gameOver, time]);

  const eliminacionObjectInsect = (objectId: number) => {
    setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== objectId));
    setScore((prevScore) => prevScore + 1);
  };

  const aplastadoInsect = (objectId: number) => {
    setObjects((prevData) =>
      prevData.map((item) => (item.id === objectId ? { ...item, img: insectImages.blood } : item))
    );
  };

  const RestartGame = () => {
    setObjects([]);
    setScore(0);
    setTime(30);
    setGameOver(false);
  };

  useEffect(() => {
    const generateInsects = () => {
      if (!isPaused && !gameOver) {
        const newInsect = {
          id: Date.now(),
          img: insectImg,
          x: Math.random() * (viewDimensions.width - 50),
          y: Math.random() * (viewDimensions.height - 50),
        };
        setObjects((prevObjects) => [...prevObjects, newInsect]);
      }
    };

    const interval = setInterval(generateInsects, 1000); // Genera un insecto cada segundo

    return () => clearInterval(interval);
  }, [isPaused, gameOver, viewDimensions, insectImg]);

  return (
    <ImageBackground source={mapImg} style={styles.container}>
      <View style={styles.textocontain}>
        <Text style={styles.texto}>Score: <Text style={{ color: 'black' }}>{score}</Text></Text>
        <Text style={styles.texto}>Tiempo: <Text style={{ color: 'black' }}>{time}</Text></Text>

        {!isPaused ? (
          <Pressable style={styles.btnpause} onPress={() => setIsPaused(true)}>
            <Icon name='pause' type="material" color={'#F1C40F'} />
          </Pressable>
        ) : (
          <Pressable style={styles.btnplay} onPress={() => setIsPaused(false)}>
            <Icon name="play-arrow" type="material" color={'#27AE60'} />
          </Pressable>
        )}
        <Pressable style={styles.btnupsalir} onPress={() => navigation.navigate('Bienvenido')}>
          <Icon name='stop' type="material" color={'#E74C3C'} />
        </Pressable>
      </View>
      <View style={styles.gamewindow} onLayout={onLayout}>
        {objects.map((obj) => (
          <Pressable
            key={obj.id}
            style={[styles.element, { top: obj.y, left: obj.x }]}
            onPressOut={() => eliminacionObjectInsect(obj.id)}
            onPressIn={() => aplastadoInsect(obj.id)}
          >
            <Image source={obj.img} style={styles.insectimg} />
          </Pressable>
        ))}
        {gameOver && (
          <Modal animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
              <ImageBackground source={require('../assets/image/modal-gameover6.jpg')} style={styles.modalView}>
                <Text style={styles.gameovertxt}>Game Over!</Text>
                <Text style={styles.puntuaciontxt}>Tu puntuacion es: {score}</Text>
                <View style={styles.containbtn}>
                  <Pressable style={styles.btnreinicio} onPress={() => RestartGame()}>
                    <Text style={styles.textbtn}>Reiniciar</Text>
                  </Pressable>
                  <Pressable style={styles.btnsalir} onPress={() => navigation.navigate('Bienvenido')}>
                    <Text style={styles.textbtn}>Salir</Text>
                  </Pressable>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        )}
        {isPaused && (
          <View style={styles.pausedmodal}>
            <View style={styles.pausedView}>
              <Text style={styles.txtpausa}>Pause!</Text>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  textocontain: {
    top: 50,
    width: "100%",
    height: 50,
    backgroundColor: "#7FB3D5",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gamewindow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  element: {
    position: "absolute",
  },
  insectimg: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gameovertxt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  puntuaciontxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  containbtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  btnreinicio: {
    backgroundColor: "#27AE60",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  btnsalir: {
    backgroundColor: "#E74C3C",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textbtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  pausedmodal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pausedView: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  txtpausa: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  btnpause: {
    backgroundColor: "#F1C40F",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  btnplay: {
    backgroundColor: "#27AE60",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  btnupsalir: {
    backgroundColor: "#E74C3C",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});

export default GameScreen;
