import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

// Componentes
import { LoginIcon } from '@heroicons/react/solid';

// Config de rotas
import buttons from '@config/buttons';

const ForgotPassword: React.FC = () => {
  // const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

  return (
    <>
      <Head>
        <title>Esqueci a senha</title>
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
          <div className="text-center text-black">
            <div className="font-bold text-2xl">
              <h1>Problemas para entrar?</h1>
            </div>
            <div className="mt-5">
              <p>
                Insira seu email que lhe enviaremos um link para que você possa
                voltar a acessar sua conta.
              </p>
            </div>
          </div>

          <form
            className="mt-8 space-y-6"
            // onSubmit={e => {
            // }}
          >
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Email"
                  // onChange={e => {}}
                />
              </div>
            </div>
            <span className="text-red-500">{message}</span>

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
                Enviar
              </button>
            </div>
          </form>
          <div className="text-sm flex justify-between">
            <p className="font-medium text-black">Ainda com problemas?</p>
            <button
              type="button"
              onClick={() => setMessage('Ainda não implementado!')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Criar nova conta
            </button>
          </div>
          <div className="text-center text-black font-bold">
            <button type="button" onClick={() => Router.push('/')}>
              Voltar ao login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

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
