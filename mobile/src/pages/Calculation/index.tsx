import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AuthContext from '@contexts/auth';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

const Calculation: React.FC = () => {
  const {user, signOut} = React.useContext(AuthContext);

  // Setando valores pelo select (são as options)
  const [tariffSelect, setTariffSelect] = React.useState<string>('0');
  const [planSelect, setPlanSelect] = React.useState<string>('0');

  // States para fazer o cálculo do valor
  // da ligação...
  const [callTime, setCallTime] = React.useState<string>('0');
  const [valueNoPlan, setValueNoPlan] = React.useState<number>(0);
  const [valueWithPlan, setValueWithPlan] = React.useState<number>(0);

  // State para renderizar o valor calculado
  const [buttonClicked, setButtonClicked] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  function getVallueCall() {
    let tariffNumber = parseFloat(tariffSelect);
    const callTimeNumber = parseFloat(callTime);
    const planSelectNumber = parseFloat(planSelect);

    if (tariffNumber === 0 || planSelectNumber === 0) {
      setMessage('Por favor, selecione todas as informações!');
    } else {
      setPlanSelect(planSelect);
      // Valor sem plano
      const valueNP = tariffNumber * callTimeNumber;
      setValueNoPlan(Math.round(valueNP));

      // Valor com plano
      const exceeds = callTimeNumber - planSelectNumber;
      const newTariff = tariffNumber + tariffNumber / 10;

      let valueWP = newTariff * exceeds;

      if (valueWP < 0) {
        valueWP = 0;
      }

      setValueWithPlan(Math.round(valueWP));

      setButtonClicked(true);
    }
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default Calculation;
