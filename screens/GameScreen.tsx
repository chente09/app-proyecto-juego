import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/base';

type InsectName = 'hormiga' | 'abeja' | 'araña' | 'cucaracha' | 'escarabajo' | 'blood';
type MapName = 'hormiguero' | 'panal' | 'telaraña' | 'estanque' | 'jardin';

interface Insect {
  name: InsectName;
  map: MapName | null;
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

const GameScreen = ({ navigation }: { navigation: any }) => {
  const [selectedInsect, setSelectedInsect] = useState<Insect | null>(null);
  const [selectedMap, setSelectedMap] = useState<MapName | null>(null);
  const [objects, setObjects] = useState<Array<{ id: number; img: any; x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30); // Tiempo en segundos
  const [gameOver, setGameOver] = useState(false);
  const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });
  const [isPaused, setIsPaused] = useState(false);

  const insectImg = selectedInsect ? insectImages[selectedInsect.name] : null;
  const mapImg = selectedMap ? mapImages[selectedMap] : null;

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

  if (!selectedInsect || !selectedMap) {
    return (
      <View style={styles.selectionScreen}>
        <Text style={styles.selectionText}>Selecciona un insecto:</Text>
        <View style={styles.insectOptions}>
          {Object.keys(insectImages).map((insectKey) => {
            if (insectKey === 'blood') return null;
            return (
              <Pressable
                key={insectKey}
                style={[
                  styles.insectOption,
                  selectedInsect?.name === insectKey ? styles.selectedOption : null,
                ]}
                onPress={() => setSelectedInsect({ name: insectKey as InsectName, map: null })}
              >
                <Image source={insectImages[insectKey as InsectName]} style={styles.insectImage} />
                <Text>{insectKey}</Text>
              </Pressable>
            );
          })}
        </View>
        {selectedInsect && (
          <>
            <Text style={styles.selectionText}>Selecciona un mapa:</Text>
            <View style={styles.mapOptions}>
              {Object.keys(mapImages).map((mapKey) => (
                <Pressable
                  key={mapKey}
                  style={[
                    styles.mapOption,
                    selectedMap === mapKey ? styles.selectedOption : null,
                  ]}
                  onPress={() => setSelectedMap(mapKey as MapName)}
                >
                  <Image source={mapImages[mapKey as MapName]} style={styles.mapImage} />
                  <Text>{mapKey}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
    );
  }

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
        <Pressable style={styles.btnupsalir} onPress={() => navigation.navigate('Bienvenida2')}>
          <Icon name='exit-to-app' type="material" color={'#E74C3C'} />
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
                  <Pressable style={styles.btnsalir} onPress={() => navigation.navigate('Bienvenida2')}>
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
              <Text style={styles.txtpausa}>Pausado</Text>
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
  },
  textocontain: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  texto: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#A9CCE3',
    borderRadius: 5,
  },
  btnpause: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  btnplay: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  btnupsalir: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  gamewindow: {
    flex: 1,
  },
  element: {
    position: 'absolute',
  },
  insectimg: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 400,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameovertxt: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFF',
  },
  puntuaciontxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containbtn: {
    marginTop: 20,
  },
  btnreinicio: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#27AE60',
    marginBottom: 10,
  },
  btnsalir: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E74C3C',
  },
  textbtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  pausedmodal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pausedView: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  txtpausa: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  selectionScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  selectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  insectOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  insectOption: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
  },
  selectedOption: {
    borderColor: '#000',
    backgroundColor: '#FFD700',
  },
  insectImage: {
    width: 50,
    height: 50,
  },
  mapOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mapOption: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
  },
  mapImage: {
    width: 50,
    height: 50,
  },
});


export default GameScreen;
