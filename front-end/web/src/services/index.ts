import Router from 'next/router';
import { destroyCookie } from 'nookies';

//Interfaces
import { IToken } from '../dtos/IToken';
import { IUser } from '../dtos/IUser';

//services
import { api } from './api';

//User Services
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
) {
  const signup = await api.post('/users/auth/signup', {
    username,
    name,
    email,
    password,
    state,
    city,
  });
  return signup.data;
}

const userServices = {
  logout,
  getUserByToken,
  signUp,
};

//Plan Services
async function getAllPlans() {
  const plans = await api.get('/plans/all');
  return plans.data;
}

async function buyPlan(id: string, user: IUser) {
  const changedUser = await api.put(`/users/update/${user.username}`, {
    plan_id: id,
  });
  return changedUser.data;
}

const planServices = {
  getAllPlans,
  buyPlan,
};

//Tariffs Services
async function getAllTariffs() {
  const plans = await api.get('/tariffs/all');
  return plans.data;
}

const tariffServices = {
  getAllTariffs,
};

export { userServices, planServices, tariffServices };
