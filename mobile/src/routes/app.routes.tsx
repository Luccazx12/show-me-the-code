import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Calculation from '../pages/Calculation';

const CalculationStack = createStackNavigator();

const CalculationRoutes: React.FC = () => (
  <CalculationStack.Navigator>
    <CalculationStack.Screen name="Calculation" component={Calculation} />
  </CalculationStack.Navigator>
);

export default CalculationRoutes;
