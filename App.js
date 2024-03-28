import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={authContext.logOut} />
        }}
      />
    </Stack.Navigator>
  );
}


function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const context = useContext(AuthContext);

  useEffect(() => {
    //for auto log in
    async function fetchToken() {

      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken)
        context.authenticate(storedToken);

      setIsTryingLogin(false)
    }

    fetchToken();
  });

  // if(isTryingLogin)
  //   return <AppLoading />

  return <Navigation />
}

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated ?
        <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
