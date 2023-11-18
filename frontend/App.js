import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import api from './api';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import PassManager from './screens/PassManager';
import Authenticate from './screens/Authenticate';

const Stack = createStackNavigator();

/*      
      <Stack.Screen name="Settings" component={Settings} /> */

function MyStack() {
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/main/status')
      .then(response => {
        return response.data
      })
      .then(data => {
        console.log(data)
        if(data.authenticated === true)
          navigation.reset({
            routes: [{ name: 'PassManager' }]
        });
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PassManager" component={PassManager}/>
      <Stack.Screen name="Authenticate" component={Authenticate}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}


