import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import BienvenidaScreen from "../screens/BienvenidaScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Bienvenida2Screen from "../screens/Bienvenida2Screen";
import GameScreen from "../screens/GameScreen";
import OfflineScreen from "../screens/OfflineScreen";
import PerfilScreen from "../screens/PerfilScreen";


///////////////STACk/////////////////
const Stack= createStackNavigator()

function MyStack(){
    return(
        <Stack.Navigator>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="BottomTab" component={MyTabs}/>
        </Stack.Navigator>
    )
}
////////////STACK/////////////
const Tab = createBottomTabNavigator()
function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Bienvenida" component={Inicio} />
            <Tab.Screen name="Bienvenida2" component={Jugar} />
            <Tab.Screen name="Game" component={MyDrawer2} />
            <Tab.Screen name="Offline" component={OfflineScreen} />
            <Tab.Screen name="Drawer" component={MyDrawer} />
        </Tab.Navigator>
    )
}
////////////DRAWER////////////////
import { createDrawerNavigator } from '@react-navigation/drawer';
import ConfigScreen from "../screens/ConfigScreen";

const Drawer = createDrawerNavigator();

function Jugar(){
  return(
    <Bienvenida2Screen/>
  );
}

function Inicio(){
  return(
    <BienvenidaScreen/>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}
function MyDrawer2() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Configuracion" component={ConfigScreen} />
      </Drawer.Navigator>
    );
  }
export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}