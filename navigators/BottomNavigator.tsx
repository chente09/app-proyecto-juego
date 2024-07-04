import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import BienvenidaScreen from "../screens/BienvenidaScreen";

const Tab = createBottomTabNavigator()
function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registro" component={RegistroScreen}/>
            <Tab.Screen name="Bienvenida" component={BienvenidaScreen} />
        </Tab.Navigator>
    )
}

export default function NavegadorBotton(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}