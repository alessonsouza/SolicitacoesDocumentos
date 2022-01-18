import { ApiSharp } from '@mui/icons-material';
import api from './api';

const TipoSolicitanteAPI = {
  getAll: async () => {
    const returnFromApi = await api.get('/tipo-solicitante/get-all');
    return returnFromApi.data;
  }

};

export default TipoSolicitanteAPI;
