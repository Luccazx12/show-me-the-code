import Head from 'next/head';
import React from 'react';
import { LockClosedIcon, LoginIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { buttons } from '../config/buttons';
import { userServices } from '../services';
import { cityServices, stateServices } from '../services/external';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const Homepage: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = React.useContext(AuthContext);
  const [message, setMessage] = React.useState<string>('');
  const [signup, setSignup] = React.useState<boolean>(false);

  const [username, setUsername] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [state, setState] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');

  const [loginEmail, setLoginEmail] = React.useState<string>('');
  const [loginPassword, setLoginPassword] = React.useState<string>('');

  const [states, setStates] = React.useState<[{ nome: string; id: number }]>([
    { nome: '', id: null },
  ]);

  const [cities, setCities] = React.useState<[{ nome: string; id: number }]>([
    { nome: '', id: null },
  ]);

  React.useEffect(() => {
    stateServices.getAllStates().then(response => {
      setStates(response);
    });
  }, []);

  async function selected(uf) {
    try {
      const response = await cityServices.getAllCitiesByUf(uf);
      setCities(response);
    } catch (error) {}
  }

  type SignInData = {
    email: string;
    password: string;
  };

  async function handleSignIn(e) {
    e.preventDefault();
    setMessage('');

    try {
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      console.log(error);
      if (error.message === 'Request failed with status code 400') {
        setMessage('Usuário ou senha inválidos!');
      } else {
        setMessage('Erro interno do servidor, tente novamente mais tarde.');
      }
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    let ico: SweetAlertIcon = 'success';
    let resp = 'Registro efetuado com sucesso!';

    const stateNumber = parseInt(state);
    const cityNumber = parseInt(city);

    const timer = 2000;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    try {
      const response = await userServices.signUp(
        username,
        name,
        email,
        password,
        stateNumber,
        cityNumber,
      );

      if (response.message) {
        ico = 'error';
        resp = response.message;
      }

      Toast.fire({
        icon: ico,
        title: resp,
      });

      if (ico !== 'error') {
        setSignup(false);
        setLoginEmail(email);
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {signup ? <>Registre-se</> : <>Logue na sua conta</>}
            </h2>
          </div>

          {signup ? (
            <>
              <form className="w-full max-w-lg" onSubmit={e => handleSignUp(e)}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-username"
                    >
                      Username
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-username"
                      type="text"
                      placeholder="Jane"
                      autoComplete="username"
                      onChange={e => {
                        setUsername(e.target.value);
                      }}
                      required
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-username"
                    >
                      Nome
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-name"
                      name="name"
                      type="text"
                      placeholder="Doe"
                      autoComplete="name"
                      onChange={e => {
                        setName(e.target.value);
                      }}
                      required
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="example@example.com"
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Senha
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      name="senha"
                      autoComplete="password"
                      placeholder="*************"
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-city"
                    >
                      State
                    </label>

                    <div className="relative">
                      <select
                        onChange={e => {
                          setState(e.target.value);
                          selected(e.target.value);
                        }}
                        className="block appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        required
                      >
                        {states.map(states => (
                          <option key={states.id} value={states.id}>
                            {states.nome}
                          </option>
                        ))}
                      </select>
                      <p className="text-red-500 text-xs italic">
                        Please fill out this field.
                      </p>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state2"
                    >
                      City
                    </label>
                    <div className="relative">
                      <select
                        onChange={e => {
                          setCity(e.target.value);
                        }}
                        className="block appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state2"
                        required
                      >
                        {cities.map(cities => (
                          <option key={cities.id} value={cities.id}>
                            {cities.nome}
                          </option>
                        ))}
                      </select>
                      <p className="text-red-500 text-xs italic">
                        Please fill out this field.
                      </p>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-around">
                  <button
                    onClick={() => setSignup(false)}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LoginIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Registrar-se
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <form className="mt-8 space-y-6" onSubmit={e => handleSignIn(e)}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px pb-2">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email"
                      onChange={e => {
                        setLoginEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      onChange={e => {
                        setLoginPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <span className="text-red-500">{message}</span>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Lembrar de mim
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Login
                  </button>
                </div>
              </form>
              <div className="text-sm flex justify-between">
                <p className="font-medium text-black">
                  Ainda não tem uma conta?
                </p>
                <button
                  onClick={() => {
                    setSignup(true);
                    setPassword('');
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Registrar-se
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx);
  const calculationPage = buttons.navButtons[0].path;

  if (token) {
    return {
      redirect: {
        destination: calculationPage,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
