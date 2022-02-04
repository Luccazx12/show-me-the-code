//services
import { api } from './api';

const getAllStates = async () => {
  try {
    const allStatesBr = await api.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );
    return allStatesBr.data;
  } catch (error) {
    return error;
  }
};

//States Services
const stateServices = {
  getAllStates,
};

const getAllCitiesByUf = async (uf: number) => {
  try {
    const allCities = await api.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
    );
    return allCities.data;
  } catch (error) {
    return error;
  }
};

const cityServices = {
  getAllCitiesByUf,
};

export { stateServices, cityServices };
