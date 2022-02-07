import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '@contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});

const SignIn: React.FC = () => {
  const {signIn} = React.useContext(AuthContext);
  const [emailF, setEmailF] = React.useState<string>('');
  const [passwordF, setPasswordF] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

  async function handleSignIn() {
    const response = await signIn(emailF, passwordF);
    if (response instanceof Error) {
      setMessage(response.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/log2.png')} />

      <StatusBar />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmailF(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPasswordF(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text>{message}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
