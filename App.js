/* eslint-disable no-unused-vars */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Button from './src/components/Button';
import Home from './src/components/Home';
import Data from './src/components/Data';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Comments from './src/components/Comments';
import Details from './src/components/Details';
import AddPost from './src/components/AddPost';

const Stack = createNativeStackNavigator();
export default function App() {
  const [count, setCount] = useState(0);
  const Login = () => {
    console.log('Login');
  };
  const Signup = () => {
    console.log('SignUp');
  };

  const countInc = () => {
    setCount(count + 1);
  };

  const countDec = () => {
    setCount(count - 1);
  };

  const clear = () => {
    setCount(0);
  };

  return (
    //  // <View style={styles.container}>
    //     {/* <Home/> */}
    //     {/* <View>
    //       <Button name={'Login'} backgroundColor={'green'} padding={10} marginTop={10} runit={Login}/>
    //       <Button name={'Signup'} backgroundColor={'grey'} padding={10} runit={Signup}/>
    //       </View> */}

    //     {/* <View style={styles.count}>
    //       <Text
    //         style={{
    //           color: 'black',
    //           fontSize: 20,
    //           fontWeight: 'bold',
    //           textAlign: 'center',
    //         }}>
    //         {count}
    //       </Text>
    //     </View>
    //     <View style={{flexDirection: 'row', margin: 10}}>
    //       <Button
    //         name={'+'}
    //         backgroundColor={'green'}
    //         padding={10}
    //         marginTop={10}
    //         runit={countInc}
    //       />
    //       <Button
    //         name={'clear'}
    //         backgroundColor={'yellow'}
    //         padding={10}
    //         marginTop={10}
    //         runit={clear}
    //       />
    //       <Button
    //         name={'-'}
    //         backgroundColor={'red'}
    //         padding={10}
    //         marginTop={10}
    //         runit={countDec}
    //       />
    //     </View> */}
    //     {/* <Data /> */}
    //   //   <NavigationContainer>
    //   //     <Stack.Navigator>
    //   //       <Stack.Screen
    //   //         name="Home"
    //   //         component={Home}
    //   //         options={{title: 'Welcome'}}
    //   //       />
    //   //     </Stack.Navigator>
    //   //   </NavigationContainer>
    //   // </View>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddPost" component={AddPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    //flexDirection:'row',
    flex: 1,
  },
  count: {
    width: 80,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
    marginLeft: 158,
    borderRadius: 10,
    marginTop: 20,
  },
});
