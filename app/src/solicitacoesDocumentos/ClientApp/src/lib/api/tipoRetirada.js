import { ApiSharp } from '@mui/icons-material';
import api from './api';

const TiporetiradaAPI = {
  getAll: async () => {
    const returnFromApi = await api.get('/tipo-retirada/get-all');
    return returnFromApi.data;
  }
};

export default TiporetiradaAPI;
