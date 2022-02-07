import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';

// config
import buttons from '@config/buttons';

// services
import api from '@services/api';
import { planServices, tariffServices, userServices } from '@services/index';
import { stateServices, cityServices } from '@services/external';

// Interfaces
import { IUser } from 'types/iUser';
import { IPlan } from 'types/iPlan';
import { ITariff } from 'types/iTariff';
import { IToken } from 'types/iToken';
import { IStates } from 'types/iStates';
import { ICities } from 'types/iCities';
import { IHeaders } from 'types/iHeaders';

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser;
  plan: IPlan[];
  tariff: ITariff[];
  signIn: (email: string, user: string) => Promise<Error | unknown>;
  states: IStates[];
  cities: ICities[];
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [plan, setPlan] = useState<IPlan[]>([]);
  const [states, setStates] = useState<IStates[]>([]);
  const [cities, setCities] = useState<ICities[]>([]);
  const [tariff, setTariff] = useState<ITariff[]>([]);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      getAllInfosAndSet(token);
    }
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const request = await userServices.signIn(email, password);
      // Se tiver mensagem de erro eu instancio
      // um erro para mandar mensagem de usuário inválido
      // para a tela de login.
      if (request.message) {
        return new Error(request.message);
      }
      const { token } = request;
      // Setando no header das requisições o token
      // para conseguirmos acessar as informações
      // de usuário, planos e tarifas.
      const headerApi: IHeaders = api.defaults.headers;
      headerApi.authorization = `Bearer ${token}`;

      // Pegando essas informações e setando no contexto para usar
      // em todas as páginas
      getAllInfosAndSet(token);

      // Setando cookie com o token para depois
      // verificarmos ele pelo lado server do nextjs
      // e assim bloquear a vizualização de uma página
      // autenticada
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      // Rota /calculation
      const firstRouter = buttons.navButtons[0].path;
      Router.push(firstRouter);
    } catch (error) {
      return new Error('Erro interno do servidor, tente novamente mais tarde.');
    }
  }

  async function getUserInfoAndCities(token: string): Promise<IUser> {
    try {
      const decodedToken: IToken = jwtDecode(token);
      const userbyToken = await userServices.getUserByToken(decodedToken);

      // const state = parseInt(user.state);
      // Pegando todas as cidades do estado do usuário
      const allCities = await cityServices.getAllCitiesByUf(userbyToken.state);
      setCities(allCities);
      return userbyToken;
    } catch (error) {
      userServices.logout();
    }
  }

  async function getAllPlans(): Promise<IPlan[]> {
    try {
      const plans = await planServices.getAllPlans();
      return plans;
    } catch (error) {
      userServices.logout();
    }
  }

  async function getAllTariffs(): Promise<ITariff[]> {
    try {
      const tariffs = await tariffServices.getAllTariffs();
      return tariffs;
    } catch (error) {
      userServices.logout();
    }
  }

  async function getAllStates(): Promise<IStates[]> {
    try {
      const allStates = await stateServices.getAllStates();
      return allStates;
    } catch (error) {
      return error;
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getAllInfosAndSet(token?: string): void {
    getAllPlans().then(response => {
      setPlan(response);
    });
    getAllTariffs().then(response => {
      setTariff(response);
    });
    getAllStates().then(response => {
      setStates(response);
    });
    getUserInfoAndCities(token).then(response => {
      setUser(response);
    });
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        states,
        cities,
        user,
        plan,
        tariff,
        isAuthenticated,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
