import Head from 'next/head';
import React from 'react';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import Img from '../components/Image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import config from '../config/config';
import Background from '../components/Background';
import Card from '../components/Card';

const server = config.serverURL;

const MyProfile: React.FC = () => {
  const { user, plan, states, cities } = useContext(AuthContext);

  return (
    <>
      <div>
        <Head>
          <title>Meu Perfil</title>
        </Head>

        <NavBar />
        <main className="profile-page">
          <Background height="500px" />

          <Card
            class={null}
            style={{ textAlign: 'center', marginTop: '-25rem' }}
          >
            <div className="px-6 mb-10">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <Img
                      alt="..."
                      src={server + user?.avatar_url}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{ maxWidth: '150px' }}
                    />
                  </div>
                </div>
                <div className="lg:mt-0 sm:mt-12 w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 lg:mt-0 sm:mt-12">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                    >
                      Editar perfil
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        22
                      </span>
                      <span className="text-sm text-gray-500">Amigos</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        10
                      </span>
                      <span className="text-sm text-gray-500">Fotos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        89
                      </span>
                      <span className="text-sm text-gray-500">Comentários</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  {user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{' '}
                  {'@' + user?.username}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                  {states.map(state => (
                    <React.Fragment key={state.id}>
                      {state.id == user?.state ? (
                        <span>{state.nome}</span>
                      ) : null}
                    </React.Fragment>
                  ))}
                  {cities.map(citie => (
                    <React.Fragment key={citie.id}>
                      {citie.id === `${user?.city}` ? (
                        <span> - {citie.nome}</span>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mb-21 text-gray-700 font-bold">
                  <i className="fas fa-university mr-2 text-lg text-gray-900"></i>
                  {plan.map(plan => (
                    <React.Fragment key={plan.id}>
                      {plan.id === user?.plan_id ? (
                        <span>Plano atual: {plan.name}</span>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      {user?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
