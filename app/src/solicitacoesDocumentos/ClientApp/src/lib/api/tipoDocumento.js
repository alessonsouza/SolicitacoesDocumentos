import { ApiSharp } from '@mui/icons-material';
import api from './api';

const TipoDocumentoAPI = {
  getAll: async () => {
    const returnFromApi = await api.get('/tipo-documentos/get-all');
    return returnFromApi.data;
  }
};

export default TipoDocumentoAPI;
