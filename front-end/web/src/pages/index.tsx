import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import router from 'next/router';

// Componentes
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LockClosedIcon, LoginIcon } from '@heroicons/react/solid';

// Config de Rotas
import buttons from '../config/buttons';

// Contextos
import { AuthContext } from '../contexts/AuthContext';

// Serviços
import { cityServices, stateServices } from '../services/external';
import { userServices } from '../services';

const Homepage: React.FC = () => {
  const { signIn } = React.useContext(AuthContext);

  // Botão para ir para renderizar o cadastro.
  const [signup, setSignup] = React.useState<boolean>(false);

  // ---------SignUP--------------
  // Inputs
  const [username, setUsername] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [state, setState] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');

  // Tremendo input se ele não tiver sido preenchido
  // Username
  const [usernameErrClass, setUsernameErrClass] = React.useState<string>('');
  const [usernameErrMessage, setUsernameErrMessage] =
    React.useState<string>('');
  // Name
  const [nameErrClass, setNameErrClass] = React.useState<string>('');
  const [nameErrMessage, setNameErrMessage] = React.useState<string>('');
  // Password
  const [passwordErrClass, setPasswordErrClass] = React.useState<string>('');
  const [passwordErrMessage, setPasswordErrMessage] =
    React.useState<string>('');
  // Email
  const [emailErrClass, setEmailErrClass] = React.useState<string>('');
  const [emailErrMessage, setEmailErrMessage] = React.useState<string>('');
  // State
  const [stateErrClass, setStateErrClass] = React.useState<string>('');
  const [stateErrMessage, setStateErrMessage] = React.useState<string>('');
  React.useState<string>('');
  // City
  const [cityErrClass, setCityErrClass] = React.useState<string>('');
  const [cityErrMessage, setCityErrMessage] = React.useState<string>('');
  // ---------SignUp-------------- //

  // ---------SignIn--------------
  const [loginEmail, setLoginEmail] = React.useState<string>('');
  const [loginPassword, setLoginPassword] = React.useState<string>('');

  // Mensagem de erro da página de signin
  const [message, setMessage] = React.useState<string>('');

  // Login (email) input handler
  const [loginEmailErrClass, setLoginEmailErrClass] =
    React.useState<string>('');
  const [loginEmailErrMessage, setLoginEmailErrMessage] =
    React.useState<string>('');

  // Password input handler
  const [loginPasswordErrClass, setLoginPasswordErrClass] =
    React.useState<string>('');
  const [loginPasswordErrMessage, setLoginPasswordErrMessage] =
    React.useState<string>('');
  // ---------SignIn-------------- //

  // Array de estados e cidades resgatados na API pública do IBGE!
  // UFS
  const [states, setStates] = React.useState<[{ nome: string; id: number }]>([
    { nome: '', id: null },
  ]);
  // Municipios
  const [cities, setCities] = React.useState<[{ nome: string; id: number }]>([
    { nome: '', id: null },
  ]);

  // Carregando todos as UF's e municipios no loading da página.
  React.useEffect(() => {
    stateServices.getAllStates().then(response => {
      setStates(response);
    });
  }, []);

  // Trazendo cidades pro select de registro (state: cities)
  // passando UF como parâmetro
  async function selected(uf) {
    try {
      if (uf === '') {
        setCity('');
      } else {
        const response = await cityServices.getAllCitiesByUf(uf);
        setCities(response);
      }
    } catch (error) {
      router.reload();
    }
  }

  // Função que verifica o se o valor (state) passado para ele é uma string
  // vazia ou então é indefinido.
  async function inputHandler(
    stateR: string,
    setStateCss: React.Dispatch<React.SetStateAction<string>>,
    setStateMessage: React.Dispatch<React.SetStateAction<string>>,
    messageR: string,
  ) {
    if (stateR === '' || undefined) {
      setStateCss('error border-red-600');
      setStateMessage(messageR);
      return false;
    }
    setStateCss('');
    setStateMessage('');
    return true;
  }

  // Login
  async function handleSignIn(e) {
    e.preventDefault();
    setMessage('');
    // Verificando se o email e senha estão vazios.
    const filled = await inputHandler(
      loginEmail,
      setLoginEmailErrClass,
      setLoginEmailErrMessage,
      'Insira seu email!',
    );
    const filled2 = await inputHandler(
      loginPassword,
      setLoginPasswordErrClass,
      setLoginPasswordErrMessage,
      'Insira sua senha!',
    );

    // Só é executado o login se o email e senha estiverem
    // devidamentes preenchidos.
    if (filled === true && filled2 === true) {
      const signin = await signIn(loginEmail, loginPassword);
      if (signin instanceof Error) {
        setMessage(signin.message);
      }
    }
  }

  const checkSignup = async () => {
    const filledUsername = await inputHandler(
      // Verificando se inseriram um nome de usuário
      username,
      setUsernameErrClass,
      setUsernameErrMessage,
      'Insira um nome de usuário!',
    );

    // Verificando se inseriram um nome
    const filledName = await inputHandler(
      name,
      setNameErrClass,
      setNameErrMessage,
      'Insira seu nome!',
    );

    // Verificando se inseriram uma email
    const filledEmail = await inputHandler(
      email,
      setEmailErrClass,
      setEmailErrMessage,
      'Insira um e-mail!',
    );

    // Verificando se inseriram uma senha
    const filledPassword = await inputHandler(
      password,
      setPasswordErrClass,
      setPasswordErrMessage,
      'Insira uma senha!',
    );

    // Estado não precisa pois ele é carregado
    // junto com a página (useEffect).

    // Verificando se selecionaram a cidade
    const filledState = await inputHandler(
      state,
      setStateErrClass,
      setStateErrMessage,
      'Insira sua cidade!',
    );

    // Verificando se selecionaram a cidade
    const filledCity = await inputHandler(
      city,
      setCityErrClass,
      setCityErrMessage,
      'Insira sua cidade!',
    );

    const checked = {
      username: filledUsername,
      name: filledName,
      email: filledEmail,
      password: filledPassword,
      state: filledState,
      city: filledCity,
    };

    return checked;
  };

  // Registro
  async function handleSignUp(e) {
    e.preventDefault();
    let ico: SweetAlertIcon = 'success';
    let resp = 'Registro efetuado com sucesso!';

    const checked = await checkSignup();
    // Exemplo de handle com input username
    if (
      checked.username === true &&
      checked.name === true &&
      checked.email === true &&
      checked.password === true &&
      checked.state === true &&
      checked.city === true
    ) {
      const stateNumber = parseInt(state, 10);
      const cityNumber = parseInt(city, 10);

      const timerOfExecute = 2000;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timerOfExecute,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      const response = await userServices.signUp(
        username,
        name,
        email,
        password,
        stateNumber,
        cityNumber,
      );

      if (response instanceof Error) {
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
        setEmail('');
        setUsername('');
        setName('');
        setPassword('');
      }
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
          </div>

          {signup ? (
            <>
              <form className="w-full max-w-lg" onSubmit={e => handleSignUp(e)}>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-username"
                    >
                      <span className="text-red-500">*</span> Nome de usuário
                    </label>
                    <input
                      className={`${usernameErrClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 md:mb-3 mb-1 leading-tight focus:outline-none focus:bg-white`}
                      id="grid-username"
                      type="text"
                      placeholder="Jane"
                      autoComplete="username"
                      value={username}
                      onChange={e => {
                        setUsername(e.target.value);
                        setUsernameErrClass('');
                        setUsernameErrMessage('');
                      }}
                    />
                    <p className="text-red-500 text-xs italic mb-2">
                      {usernameErrMessage}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-username"
                    >
                      <span className="text-red-500">*</span> Nome
                    </label>
                    <input
                      className={`${nameErrClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 md:mb-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                      id="grid-name"
                      name="name"
                      type="text"
                      placeholder="Doe"
                      autoComplete="name"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        setNameErrClass('');
                        setNameErrMessage('');
                      }}
                    />
                    <p className="text-red-500 text-xs italic mb-2">
                      {nameErrMessage}
                    </p>
                  </div>
                  <div className="w-full px-3 mb-2 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      <span className="text-red-500">*</span> Email
                    </label>
                    <input
                      className={`${emailErrClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 md:mb-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                      id="grid-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="example@example.com"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setEmailErrClass('');
                        setEmailErrMessage('');
                      }}
                    />
                    <p className="text-red-500 text-xs italic mb-2">
                      {emailErrMessage}
                    </p>
                  </div>
                  <div className="w-full px-3 mb-2 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      <span className="text-red-500">*</span> Senha
                    </label>
                    <input
                      className={`${passwordErrClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 md:mb-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                      id="grid-password"
                      type="password"
                      name="senha"
                      autoComplete="password"
                      placeholder="*************"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        setPasswordErrClass('');
                        setPasswordErrMessage('');
                      }}
                    />
                    <p className="text-red-500 text-xs italic mb-2">
                      {passwordErrMessage}
                    </p>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                        htmlFor="grid-city"
                      >
                        <span className="text-red-500">*</span> Estado
                      </label>

                      <div className="relative">
                        <select
                          className={`${stateErrClass} block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 md:mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                          value={state}
                          onChange={e => {
                            setState(e.target.value);
                            setStateErrClass('');
                            setStateErrMessage('');
                            // Passando valor para uf
                            // (requisição das cidades)
                            selected(e.target.value);
                          }}
                          id="grid-state"
                        >
                          <option value="">Selecione um estado</option>
                          {states.map(stateP => (
                            <option key={stateP.id} value={stateP.id}>
                              {stateP.nome}
                            </option>
                          ))}
                        </select>
                        <p className="text-red-500 text-xs italic">
                          {stateErrMessage}
                        </p>
                        <div className="pointer-events-none absolute inset-y-0 bottom-3 right-0 flex items-center px-2 text-gray-700">
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
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-state2"
                      >
                        <span className="text-red-500">*</span> Cidade
                      </label>
                      <div className="relative">
                        <select
                          className={`${cityErrClass} block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 md:mb-3 mb-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                          value={city}
                          defaultValue=""
                          onChange={e => {
                            setCity(e.target.value);
                            setCityErrClass('');
                            setCityErrMessage('');
                          }}
                          id="grid-state2"
                        >
                          <option value="">Selecione uma cidade</option>
                          {state !== '' ? (
                            <>
                              (
                              {cities.map(cityP => (
                                <option key={cityP.id} value={cityP.id}>
                                  {cityP.nome}
                                </option>
                              ))}
                              )
                            </>
                          ) : null}
                        </select>
                        <p className="text-red-500 text-xs italic mb-2">
                          {cityErrMessage}
                        </p>
                        <div className="pointer-events-none absolute inset-y-0 right-0 bottom-3 flex items-center px-2 text-gray-700">
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
                    Cadastrar-se
                  </button>
                </div>
              </form>
              <div className="text-sm flex justify-between">
                <p className="font-medium text-black">Já tem uma conta?</p>
                <button
                  type="button"
                  onClick={() => {
                    setSignup(false);
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Conecte-se
                </button>
              </div>
            </>
          ) : (
            <>
              <form className="mt-8 space-y-6" onSubmit={e => handleSignIn(e)}>
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
                      className={` ${loginEmailErrClass} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2`}
                      placeholder="Email"
                      value={loginEmail}
                      onChange={e => {
                        setLoginEmail(e.target.value);
                        setLoginEmailErrClass('');
                        setLoginEmailErrMessage('');
                      }}
                    />
                    <p className="text-red-500 text-xs italic mb-2">
                      {loginEmailErrMessage}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="password"
                      className={` ${loginPasswordErrClass} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Password"
                      value={loginPassword}
                      onChange={e => {
                        setLoginPassword(e.target.value);
                        setLoginPasswordErrClass('');
                        setLoginPasswordErrMessage('');
                      }}
                    />
                    <p className="text-red-500 text-xs italic mb-2">
                      {loginPasswordErrMessage}
                    </p>
                  </div>
                </div>
                <span className="text-red-500">{message}</span>

                <div className="flex items-center justify-between">
                  <div className="flex text-sm text-center">
                    <a
                      href="/forgotPassword"
                      className="font-medium text-center text-indigo-600 hover:text-indigo-500"
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
                      <LoginIcon
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
                  type="button"
                  onClick={() => {
                    setSignup(true);
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
  const { 'nextauth.token': token } = parseCookies(ctx);
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
