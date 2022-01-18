import { ApiSharp } from '@mui/icons-material';
import api from './api';

const MotivoSolicitacaoAPI = {
  getAll: async () => {
    const returnFromApi = await api.get('/motivo-solicitacao/get-all');
    return returnFromApi.data;
  }
};

export default MotivoSolicitacaoAPI;
