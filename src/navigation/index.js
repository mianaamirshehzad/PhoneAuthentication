import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SmsCode from '../screens/SmsCode';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import VerifyCode from '../screens/VerifyCode';
import Account from '../screens/Account';
import Grocery from '../screens/Grocery';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SmsCode"
          component={SmsCode}
          options={{ headerShown: false }} />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />
           <Stack.Screen
          name="VerifyCode"
          component={VerifyCode}
          options={{ title: "" }} />
          <Stack.Screen
            name='Account'
            component={Account}
            options={{headerShown: false}} />
          <Stack.Screen
            name='Grocery'
            component={Grocery}
            options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;