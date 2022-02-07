import React from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import Router from 'next/router';
import { AuthContext } from '@contexts/AuthContext';
import { IPlan } from 'types/iPlan';
import { planServices } from '@services/index';
import Img from './Image';

interface IProp {
  css: string;
  actualPlan: boolean;
}

interface Props {
  plan: IPlan;
  prop?: IProp;
}

const Plan: React.FC<Props> = ({ plan, prop }) => {
  const { user } = React.useContext(AuthContext);

  Plan.defaultProps = {
    prop: null,
  };

  const buyFunction = (id: string, planName: string) => {
    planServices.buyPlan(id, user.username).then(response => {
      let ico: SweetAlertIcon = 'success';
      let resp = `Plano ${planName} adquirido com sucesso!`;

      if (response.message) {
        ico = 'error';
        resp = response.message;
      }
      const timer = 1500;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: ico,
        title: resp,
      });

      setTimeout(() => {
        // Renderizando novamente a página de planos
        // na metade do tempo da mensagem
        if (ico === 'success') {
          Router.ready(() => {
            Router.reload();
          });
        }
      }, timer / 1.5);
    });
  };

  return (
    <div className={`rounded overflow-hidden shadow-xl ${prop?.css}`}>
      <Img
        className="w-full"
        src={plan?.image_url || 'plano não possui imagem'}
        alt="Sample"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">
          {plan?.name || 'plano não possui nome'}
        </div>
        <p className="text-gray-700 text-base">
          {plan?.description || 'plano não possui descrição'}
        </p>
        {prop?.actualPlan ? (
          <div className="font-bold text-red-600 mt-1">
            <h3>(Plano Atual)</h3>
          </div>
        ) : null}
      </div>
      <div className="px-2 pt-1 pb-6">
        {prop?.actualPlan ? null : (
          <button
            type="button"
            onClick={() => buyFunction(plan?.id, plan?.name)}
            className="bg-transparent hover:bg-gray-800 text-gray-800 hover:text-white py-1 px-4 border border-gray-800 hover:border-transparent rounded"
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  );
};

export default Plan;
