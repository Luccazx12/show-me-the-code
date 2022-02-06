import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import getAPIClient from '../services/axios';

// Componentes
import Nav from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Background from '../components/Background';

// Contextos
import { AuthContext } from '../contexts/AuthContext';

const Calculation: React.FC = () => {
  const { user, plan, tariff } = React.useContext(AuthContext);

  // Setando valores pelo select (são as options)
  const [tariffSelect, setTariffSelect] = React.useState<string>('0');
  const [planSelect, setPlanSelect] = React.useState<string>('0');

  // States para fazer o cálculo do valor
  // da ligação...
  const [callTime, setCallTime] = React.useState<string>('0');
  const [valueNoPlan, setValueNoPlan] = React.useState<number>(0);
  const [valueWithPlan, setValueWithPlan] = React.useState<number>(0);

  // State para renderizar o valor calculado
  const [buttonClicked, setButtonClicked] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const getValueCall = () => {
    let tariffNumber = parseFloat(tariffSelect);
    const callTimeNumber = parseFloat(callTime);
    const planSelectNumber = parseFloat(planSelect);

    if (tariffNumber === 0 || planSelectNumber === 0) {
      setMessage('Por favor, selecione todas as informações!');
    } else {
      setPlanSelect(planSelect);
      // Valor sem plano
      const valueNP = tariffNumber * callTimeNumber;
      setValueNoPlan(Math.round(valueNP));

      // Valor com plano
      const exceeds = callTimeNumber - planSelectNumber;
      const newTariff = tariffNumber + tariffNumber / 10;

      let valueWP = newTariff * exceeds;

      if (valueWP < 0) {
        valueWP = 0;
      }

      setValueWithPlan(Math.round(valueWP));

      setButtonClicked(true);
    }
  };

  const backToCalculation = () => {
    setMessage('');
    setPlanSelect('0');
    setTariffSelect('0');
    setButtonClicked(false);
  };

  return (
    <div>
      <Head>
        <title>Calcular</title>
      </Head>

      <Nav />
      <main className="profile-page">
        <Background height="500px" />

        <Card class="p-4" style={{ textAlign: 'center', marginTop: '-27rem' }}>
          <div className="-mb-5">
            <h1 className="text-black font-bold text-4xl uppercase mb-5">
              {buttonClicked
                ? 'Valor da ligação'
                : 'Calcular o valor da ligação'}
            </h1>
          </div>

          <div className="flex justify-center mt-5">
            {' '}
            <div
              style={{
                width: '30rem',
              }}
              className="flex flex-wrap -mx-3 mt-5"
            >
              {buttonClicked ? (
                <>
                  {/* <div className="w-full md:w-3/1 px-3 mb-6 mb-2">

                    </div> */}
                  <div className="w-full md:w-3/2 px-3 mb-6 md:mb-0 text-black">
                    <div>
                      <h1 className="text-xl mb-2 text-black">
                        Com o plano selecionado:
                      </h1>
                      <div className="flex justify-center">
                        <h2 className="text-bold text-black text-8xl ml-5">
                          {valueWithPlan}
                        </h2>
                        <div className="mt-10">
                          <div className="mt-6 text-red-500">
                            {' '}
                            <p>R$</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* {plan.map(plan => (
                        <>{plan.id == planSelect ? <>{plan.name}</> : <></>}</>
                      ))} */}
                    <div className="pt-6">
                      <h1 className="text-xl mb-2 ">Sem o plano:</h1>
                      <div className="flex justify-center">
                        <h2 className="text-bold text-black text-8xl ml-5">
                          {valueNoPlan}
                        </h2>
                        <div className="mt-10">
                          <div className="mt-6 text-red-500">
                            {' '}
                            <p>R$</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-2 md:mt-5">
                    <div>
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => backToCalculation()}
                      >
                        Voltar
                      </button>
                    </div>

                    <div className="text-black mt-3">
                      <p className="mb-2">
                        <span>Observações:</span>
                      </p>
                      <p className="mb-2">
                        <span>*</span> Os resultados podem ter sido
                        arredondados.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-3/1 px-3 mb-6 mb-2">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-city"
                    >
                      Tarifas (DDD de origem e destino)
                    </label>
                    <div className="relative">
                      <select
                        onChange={e => setTariffSelect(e.target.value)}
                        className="form-select appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      text-center
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Select-tarif"
                        id="Select-tarif"
                        required
                      >
                        <option value="0">Selecione uma tarifa</option>
                        {tariff.map(tariffP => (
                          <React.Fragment key={tariffP.id}>
                            {
                              // Renderizando somente tariffas setadas como ativas
                              // no banco de dados
                              tariffP.activated ? (
                                <option
                                  key={tariffP.id}
                                  value={tariffP.coast_per_minute}
                                >
                                  Origem: {tariffP.origin} - Destino:{' '}
                                  {tariffP.destiny} - (
                                  {tariffP.coast_per_minute}
                                  R$/min)
                                </option>
                              ) : null
                            }
                          </React.Fragment>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 top-3 flex items-center px-2 text-gray-700 bottom-3">
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
                  <div className="w-full md:w-3/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state2"
                    >
                      Planos
                    </label>
                    <div className="relative mb-3">
                      <select
                        onChange={e => setPlanSelect(e.target.value)}
                        className="form-select appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      text-center
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Select-plan"
                        id="Select-plan"
                        required
                      >
                        <option value="0">Selecione um plano</option>
                        {plan.map(planP => (
                          <React.Fragment key={planP.id}>
                            {planP.id === user?.plan_id && planP.activated ? (
                              <option value={planP.time_in_minutes}>
                                {planP.name} (Seu plano atual)
                              </option>
                            ) : (
                              // eslint-disable-next-line react/jsx-no-useless-fragment
                              <>
                                {planP.activated ? (
                                  <option
                                    key={planP.id}
                                    value={planP.time_in_minutes}
                                  >
                                    {planP.name}
                                  </option>
                                ) : null}
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 top-3 flex items-center px-1 text-gray-700 bottom-3">
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
                  <div className="w-full md:w-3/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state2"
                    >
                      Tempo de ligação (min)
                    </label>
                    <div className="relative mb-3">
                      <input
                        className="form-select appearance-none
                          block
                          w-full
                          px-3
                          py-2
                          text-center
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="number"
                        placeholder="Tempo da ligação (minutos)"
                        onChange={e => setCallTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <h2 className="text-red-500 mb-4">{message}</h2>
                  </div>

                  <div className="w-full">
                    <div>
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => getValueCall()}
                      >
                        Calcular
                      </button>
                    </div>

                    <div className="text-black mt-3">
                      <p className="mb-2">
                        <span>Observações:</span>
                      </p>
                      <p className="mb-2">
                        <span>*</span> Os minutos excedentes de seu plano tem um
                        acréscimo de 10% sobre a tarifa normal do minuto.
                      </p>
                      <p>
                        <span>*</span> Consulte a lista de tarifas{' '}
                        <a href="/tariffs">
                          <span>clicando aqui</span>.
                        </a>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Calculation;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apiClient = getAPIClient(ctx);
  const { 'nextauth.token': token } = parseCookies(ctx);

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
