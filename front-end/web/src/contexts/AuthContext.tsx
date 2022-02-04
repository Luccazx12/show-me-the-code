import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import jwt_decode from 'jwt-decode';

//config
import { buttons } from '../config/buttons';

//services
import { api } from '../services/api';
import { planServices, tariffServices, userServices } from '../services';
import { stateServices, cityServices } from '../services/external';

//Interfaces
import { IUser } from '../dtos/IUser';
import { IPlan } from '../dtos/IPlan';
import { ITariff } from '../dtos/ITariff';
import { IToken } from '../dtos/IToken';
import { IStates } from '../dtos/IStates';
import { ICities } from '../dtos/ICities';

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  plan: IPlan[];
  tariff: ITariff[];
  signIn: (email: string, user: string) => Promise<void>;
  states: IStates[];
  cities: ICities[];
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
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
    const request = await api.post('/users/auth/signin', {
      email,
      password,
    });

    try {
      const { token } = request.data;

      //Setando no header das requisições o token
      //para conseguirmos acessar as informações
      //de usuário, planos e tarifas.
      api.defaults.headers['authorization'] = `Bearer ${token}`;

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

      //Rota /calculation
      const firstRouter = buttons.navButtons[0].path;
      Router.push(firstRouter);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getUserInfoAndCities(token: string): Promise<IUser> {
    try {
      const decodedToken: IToken = jwt_decode(token);
      const user = await userServices.getUserByToken(decodedToken);

      // const state = parseInt(user.state);
      // Pegando todas as cidades do estado do usuário
      const allCities = await cityServices.getAllCitiesByUf(user.state);
      setCities(allCities);
      return user;
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

  async function getAllCitiesByUserUf(uf: number): Promise<ICities[]> {
    try {
    } catch (error) {
      return error;
    }
  }

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
    <AuthContext.Provider
      value={{
        states,
        cities,
        user,
        setUser,
        plan,
        tariff,
        isAuthenticated,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
