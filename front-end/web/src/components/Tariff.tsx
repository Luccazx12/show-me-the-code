import React from 'react';

//types
import { ITariff } from '../dtos/ITariff';

interface Props {
  tariff: ITariff;
}

const Tariff: React.FC<Props> = ({ tariff }) => {
  return (
    <tr>
      <td className="px-2 py-2 whitespace-nowrap">
        <div className="flex items-center"></div>
        <div className="ml-4 px-3">
          <div className="text-sm font-medium text-gray-900">
            {tariff?.origin}
          </div>
          <div className="text-sm text-gray-500">(DDD)</div>
        </div>
      </td>
      <td className="px-1 py-2 whitespace-nowrap">
        <div className="text-sm text-gray-900">{tariff.destiny}</div>
        <div className="text-sm text-gray-500">(DDD)</div>
      </td>

      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
        <div className="text-sm text-gray-900">{tariff.coast_per_minute}</div>
        <div className="text-sm text-gray-500">(R$)</div>
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <span
          className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
            //Mudando cor caso alguma tarifa esteja desabilitada no banco de dados
            tariff?.activated === true
              ? 'text-green-800 bg-green-100'
              : 'text-red-800 bg-red-100'
          }`}
        >
          {/* Mostrando status como habilitado se a tarifa esteja com activated setado como true
          ou desabilitado caso não esteja */}
          {tariff?.activated === true ? 'Habilitado' : 'Desabilitado'}
        </span>
      </td>
      {/* <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
            </td> */}
    </tr>
  );
};

export default Tariff;
