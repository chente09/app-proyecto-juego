import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BienvenidaScreen from '../screens/BienvenidaScreen';
import Bienvenida2Screen from '../screens/Bienvenida2Screen';
import GameScreen from '../screens/GameScreen';
import LoginScreen from '../screens/LoginScreen';
import OfflineScreen from '../screens/OfflineScreen';
import PerfilScreen from '../screens/PerfilScreen';
import RegistroScreen from '../screens/RegistroScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome1" component={BienvenidaScreen} />
      <Tab.Screen name="Welcome2" component={Bienvenida2Screen} />
      <Tab.Screen name="Game" component={GameScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Offline" component={OfflineScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Perfil" component={RegistroScreen} />
    </Tab.Navigator>
  );
}

export default function Navegador() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}