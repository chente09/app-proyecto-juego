import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavegadorBotton from './navigators/BottomNavigator';
import Navegador from './navigators/BottomNavigator';
import GameScreen from './screens/GameScreen';


export default function App() {
  return (
   <Navegador/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
