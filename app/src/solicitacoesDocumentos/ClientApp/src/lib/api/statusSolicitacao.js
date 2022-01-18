import { ApiSharp } from '@mui/icons-material';
import api from './api';

const StatusSolicitacaoAPI = {
  getAll: async () => {
    const returnFromApi = await api.get('/status-solicitacao/get-all');
    return returnFromApi.data;
  }
};

export default StatusSolicitacaoAPI;
