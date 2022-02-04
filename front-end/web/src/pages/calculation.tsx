import React from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../services/axios';

//Components
import Nav from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Background from '../components/Background';

//Context
import { AuthContext } from '../contexts/AuthContext';

const Calculation: React.FC = () => {
  const { user, plan, tariff } = React.useContext(AuthContext);
  const [tariffSelect, setTariffSelect] = React.useState<string>('0');
  const [planSelect, setPlanSelect] = React.useState<string>('0');
  const [callTime, setCallTime] = React.useState<string>('0');
  const [valueNoPlan, setValueNoPlan] = React.useState<number>(0);
  const [valueWithPlan, setValueWithPlan] = React.useState<number>(0);

  const getValueCall = () => {
    let tariffNumber = parseFloat(tariffSelect);
    const callTimeNumber = parseFloat(callTime);
    const planSelectNumber = parseFloat(planSelect);

    //Valor sem plano
    const valueNP = tariffNumber * callTimeNumber;
    setValueNoPlan(valueNP);

    //Valor com plano
    const exceeds = callTimeNumber - planSelectNumber;
    const newTariff = tariffNumber + tariffNumber / 10;

    let valueWP = newTariff * exceeds;

    if (valueWP < 0) {
      valueWP = 0;
    }

    setValueWithPlan(valueWP);
  };

  return (
    <>
      <div>
        <Head>
          <title>Calcular</title>
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
                Calcular o valor da ligação
              </h1>
            </div>

            <div className="flex align-middle justify-center p-5 m-4">
              <div className="relative">
                <div className="mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-tariff"
                  >
                    Tarifa
                  </label>

                  <select
                    style={{ width: '20rem' }}
                    className="py-2 px-3 appearance-none bg-gray-200 border border-red-500 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue={0}
                    onChange={e => setTariffSelect(e.target.value)}
                  >
                    <option value={0}>Selecione uma Tarifa</option>
                    {tariff.map(tariff => (
                      <>
                        {
                          //Renderizando somente tariffas setadas como ativas
                          //no banco de dados
                          tariff.activated ? (
                            <option
                              key={tariff.id}
                              value={tariff.coast_per_minute}
                            >
                              Origem: {tariff.origin} - Destino:{' '}
                              {tariff.destiny}
                            </option>
                          ) : null
                        }
                      </>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-plan"
                  >
                    Plano
                  </label>
                  <select
                    style={{ width: '20rem' }}
                    className="py-2 px-3 appearance-none bg-gray-200 border border-red-500 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={e => setPlanSelect(e.target.value)}
                  >
                    <option value="0">Selecione um plano</option>
                    {plan.map(plan => (
                      <>
                        {plan.id === user?.plan_id && plan.activated ? (
                          <option value={plan.time_in_minutes}>
                            Meu plano ({plan.name})
                          </option>
                        ) : (
                          <>
                            {plan.activated ? (
                              <option
                                key={plan.id}
                                value={plan.time_in_minutes}
                              >
                                {plan.name}
                              </option>
                            ) : null}
                          </>
                        )}
                      </>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-plan"
                  >
                    Tempo da ligação (min)
                  </label>
                  <input
                    style={{ width: '20rem' }}
                    className="py-2 px-3 appearance-none bg-gray-200 border border-red-500 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="Tempo da ligação (minutos)"
                    onChange={e => setCallTime(e.target.value)}
                  ></input>
                </div>

                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => getValueCall()}
                >
                  Calcular
                </button>
                <div className="text-black mt-3">
                  <h2>
                    Valor sem o plano:{' '}
                    <span className="text-red-600">{valueNoPlan} R$</span>
                  </h2>
                  <h2>
                    Valor com o plano selecionado:{' '}
                    <span className="text-red-600">{valueWithPlan} R$</span>
                  </h2>
                </div>
              </div>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Calculation;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await apiClient.get('/users');

  return {
    props: {},
  };
};
