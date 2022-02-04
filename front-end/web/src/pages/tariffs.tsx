import Head from 'next/head';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

//Components
import Nav from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Background from '../components/Background';
import Tariff from '../components/Tariff';

//Contexts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Tariffs: React.FC = () => {
  const { tariff } = useContext(AuthContext);

  return (
    <>
      <div>
        <Head>
          <title>Tarifasw</title>
        </Head>

        <Nav />
        <main className="profile-page">
          <Background height="500px" />

          <Card class={'p-4'} style={{ marginTop: '-27rem' }}>
            <div className="">
              <h1 className="text-black font-bold text-4xl uppercase text-center">
                Tarifas
              </h1>
            </div>

            <table className="min-w-full divide-y divide-gray-200 mt-4 text-center">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <p style={{ marginLeft: '15px' }}>Origem</p>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Destino
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Custo por minuto
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tariff.map(tariff => (
                  <Tariff key={tariff.id} tariff={tariff}></Tariff>
                ))}
              </tbody>
            </table>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Tariffs;

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
