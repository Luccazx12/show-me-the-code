import Head from 'next/head';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import Nav from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Plan from '../components/Plan';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import config from '../config/config';
import Background from '../components/Background';
import { buttons } from '../config/buttons';

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
  const { plan, user } = useContext(AuthContext);

  return (
    <>
      <div>
        <Head>
          <title>Planos</title>
        </Head>

        <Nav />
        <main className="profile-page">
          <Background height="500px" />

          <Card
            class={'p-4'}
            style={{ textAlign: 'center', marginTop: '-27rem' }}
          >
            <div className="-mb-5">
              <h1 className="text-black font-bold text-4xl uppercase">
                Planos
              </h1>
            </div>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {plan.map(plan => (
                <>
                  {plan.id === user?.plan_id ? (
                    <Plan
                      prop={{
                        css: 'border-y-4 border-red-500',
                        actualPlan: true,
                      }}
                      key={plan.id}
                      plan={{
                        ...plan,
                        image_url: `${server}${plan.image_url}`,
                      }}
                    ></Plan>
                  ) : (
                    <Plan
                      key={plan.id}
                      plan={{
                        ...plan,
                        image_url: `${server}${plan.image_url}`,
                      }}
                    ></Plan>
                  )}
                </>
              ))}
            </div>

            <h3 className="text-black text-lg">
              *obs: Minutos excedentes tem um acréscimo de 10% sobre a tarifa
              normal do minuto. Consulte a lista de tarifas{' '}
              <span>
                <a href="/tariffs">
                  <span>Clicando aqui</span>
                </a>
              </span>
            </h3>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Plans;

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
