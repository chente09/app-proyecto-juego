import { Image, ImageBackground, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const InsectButton = ({ insect, onPress }: { insect: Insect, onPress: () => void }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={styles.textbutton}>{insect.name}</Text>
  </TouchableOpacity>
);

type InsectName = 'hormiga' | 'abeja' | 'araña' | 'cucaracha' | 'escarabajo';
type MapName = 'hormiguero' | 'panal' | 'telaraña' | 'jardin';

interface Insect {
  name: InsectName;
  map: MapName;
}


export default function BienvenidaScreen() {
  const navigation = useNavigation();

  const handleInsectPress = (name: InsectName, map: MapName) => {
    navigation.navigate('Game', { insect: { name, map } });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/fondo-bienv4r3.jpg')}
        style={styles.background}
      >
        <Text style={styles.subtitulo}>Escoge el insecto que quieres aplastar!!</Text>
        <View>
          {[
            { name: 'hormiga', map: 'hormiguero' },
            { name: 'abeja', map: 'panal' },
            { name: 'araña', map: 'telaraña' },
            { name: 'cucaracha', map: 'jardin' },
            { name: 'escarabajo', map: 'jardin' },
          ].map((insect, index) => (
            <InsectButton
              key={index}
              insect={insect}
              onPress={() => handleInsectPress(insect.name, insect.map)}
            />
          ))}
        </View>
      </ImageBackground>
    </View>
  );
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
  btn: {
    width: 150,
    height: 35,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'rgb(89,166,98)',
    paddingTop: 5,
    borderRadius: 15,
  },
  textbutton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitulo: {
    marginTop: 20,
    fontSize: 25,
    color: "#FF0800",
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,
  },
});
