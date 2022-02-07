/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from 'next/router';
import { destroyCookie } from 'nookies';

// Interfaces
import { IToken } from 'types/iToken';
// import { IUser } from '@types/iUser';

// services
import api from '@services/api';

// User Services
function logout() {
  destroyCookie({}, 'nextauth.token');
  Router.push('/');
}

async function getUserByToken(decodedToken: IToken) {
  const user = await api.get(`/users/${decodedToken.username}`);
  return user.data;
}

async function signUp(
  username: string,
  name: string,
  email: string,
  password: string,
  state: number,
  city: number,
): Promise<Error | any> {
  try {
    const signup = await api.post('/users/auth/signup', {
      username,
      name,
      email,
      password,
      state,
      city,
    });

    if (signup.data.message) {
      return new Error(signup.data.message);
    }

    return signup.data;
  } catch (error) {
    return new Error('Erro interno do servidor, tente novamente mais tarde.');
  }
}

async function signIn(email: string, password: string): Promise<Error | any> {
  const signin = await api.post('/users/auth/signin', { email, password });
  return signin.data;
}

const userServices = {
  logout,
  getUserByToken,
  signUp,
  signIn,
};

// Plan Services
async function getAllPlans() {
  const plans = await api.get('/plans/all');
  return plans.data;
}

async function buyPlan(id: string, username: string) {
  const changedUser = await api.put(`/users/update/${username}`, {
    plan_id: id,
  });
  return changedUser.data;
}

const planServices = {
  getAllPlans,
  buyPlan,
};

// Tariffs Services
async function getAllTariffs() {
  const plans = await api.get('/tariffs/all');
  return plans.data;
}

const tariffServices = {
  getAllTariffs,
};

export { userServices, planServices, tariffServices };
