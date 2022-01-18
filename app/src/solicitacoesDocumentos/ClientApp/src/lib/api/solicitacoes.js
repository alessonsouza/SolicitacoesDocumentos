import api from './api';

const SolicitacaoAPI = {
  insert: async (values) => {
    let returnFromApi;
    await api.post('/solicitacoes/save-solicitacao', values).then(res => returnFromApi = res.data)
    return returnFromApi
  },
  update: async (values) => {
    let returnFromApi;
    await api.post('/solicitacoes/update-solicitacao', values).then(res => returnFromApi = res.data)
    return returnFromApi
  },
  getSolicitacoes: async () => {
    const returnFromApi = await api.get('/solicitacoes/get-solicitacoes');
    return returnFromApi.data;
  }
  ,
  getSolicitacaoByID: async (id, data) => {
    const returnFromApi = await api.get(`/solicitacoes/get-solicitacao-by-id/${id}/${data}`);
    return returnFromApi.data;
  },
  saveDocument: async (values) => {
    let returnFromApi
    await api.post('/solicitacoes/save-documents', values).then((res) => {
      returnFromApi = res.data
    })
    return returnFromApi
  },
  getImage: async () => {
    const returnFromApi = await api.get('/solicitacoes/get-image')
    return returnFromApi.data
  },
  deleteEvent: async (values) => {
    let returnFromApi
    await api
      .post(`/solicitacoes/delete-event/${values}`)
      .then((res) => {
        returnFromApi = res
      })
    return returnFromApi.data
  }
};

export default SolicitacaoAPI;
