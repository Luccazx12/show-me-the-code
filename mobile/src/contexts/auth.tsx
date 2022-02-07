import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import services from '@services/index';
import {IUser} from 'types/iUser';
import api from '@services/api';
import {IHeaders} from 'types/iHeaders';

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  signIn: (email: string, user: string) => Promise<IUser | Error>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userServices = services.userServices;

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('rn-auth:user');
      const storagedToken = await AsyncStorage.getItem('rn-auth:user');

      // //Loading demorando 2seg
      // await new Promise(resolve => setTimeout(resolve, 2000));

      if (storagedToken && storagedUser) {
        const headerApi: IHeaders = api.defaults.headers;
        headerApi.authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  async function signIn(
    email: string,
    password: string,
  ): Promise<IUser | Error> {
    const response = await userServices.signIn(email, password);

    if (response.message) {
      return new Error(response.message);
    } else {
      setUser(response.user);

      const headerApi: IHeaders = api.defaults.headers;
      headerApi.authorization = `Bearer ${response.token}`;

      await AsyncStorage.setItem('rn-auth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('rn-auth:user', response.token);
      return response;
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, loading, signOut, user, signIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
