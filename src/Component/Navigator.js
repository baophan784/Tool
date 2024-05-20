import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screen/homeScreen'
import LoginSreen from '../Screen/loginScreen'
import GameScreen from '../Screen/GameScreen';
import Header from './Header';
import HeaderNoneMenu from './HeaderNoneMenu';

const Stack = createNativeStackNavigator();
function Navigation() {
    return ( 
    <NavigationContainer>

        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginSreen} options={{headerShown: false,}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerBackVisible: false,headerTitle:Header}}/>
        <Stack.Screen name="Game" component={GameScreen} options={{ headerBackVisible: true,headerTitle:HeaderNoneMenu}}/>
        

      </Stack.Navigator>
    </NavigationContainer> );
}

export default Navigation;