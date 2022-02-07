import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

// next.config - Configs
import config from '@config/config';

// Contextos
import { AuthContext } from '@contexts/AuthContext';

// Componentes
import Nav from '@components/NavBar';
import Background from '@components/Background';
import Card from '@components/Card';
import Plan from '@components/Plan';
import Footer from '@components/Footer';

type Plans = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  time_in_minutes: number;
  activated: boolean;
  created_at: Date;
  updated_at: Date;
};

const Plans: React.FC = () => {
  const server = config.serverURL;
  const { plan, user } = React.useContext(AuthContext);

  return (
    <div>
      <div>
        <Head>
          <title>Planos</title>
        </Head>

        <Nav />
        <main className="profile-page">
          <Background height="500px" />

          <Card
            class="p-4"
            style={{ textAlign: 'center', marginTop: '-27rem' }}
          >
            <div className="-mb-5">
              <h1 className="text-black font-bold text-4xl uppercase">
                Planos
              </h1>
            </div>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {plan.map(planP => (
                <React.Fragment key={planP.id}>
                  {planP.id === user?.plan_id ? (
                    <Plan
                      prop={{
                        css: 'border-y-4 border-red-500',
                        actualPlan: true,
                      }}
                      key={planP.id}
                      plan={{
                        ...planP,
                        image_url: `${server}${planP.image_url}`,
                      }}
                    />
                  ) : (
                    <Plan
                      key={planP.id}
                      plan={{
                        ...planP,
                        image_url: `${server}${planP.image_url}`,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <h3 className="text-black text-lg">
              <span>*</span> obs: Minutos excedentes tem um acréscimo de 10%
              sobre a tarifa normal do minuto. Consulte a lista de tarifas{' '}
              <button type="button" onClick={() => Router.push('/tariffs')}>
                <a>
                  <span>clicando aqui</span>.
                </a>
              </button>
            </h3>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Plans;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'nextauth.token': token } = parseCookies(ctx);

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
