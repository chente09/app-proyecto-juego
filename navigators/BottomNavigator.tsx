import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import BienvenidaScreen from "../screens/BienvenidaScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Bienvenida2Screen from "../screens/Bienvenida2Screen";
import GameScreen from "../screens/GameScreen";
import PerfilScreen from "../screens/PerfilScreen";






///////////////STACk/////////////////
const Stack= createStackNavigator()

function MyStack(){
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Bienvenida2" component={Bienvenida2Screen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="Bienvenido" component={BienvenidaScreen}/>
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    )
}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}