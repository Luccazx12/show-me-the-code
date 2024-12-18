import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../../src/pages/SignIn/';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
