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
  getSolicitacoes: async (values) => {
    let returnFromApi
    await api.post('/solicitacoes/get-solicitacoes', values).then(res => returnFromApi = res);
    return returnFromApi.data;
  }
  ,
  getSolicitacaoByID: async (id) => {
    const returnFromApi = await api.get(`/solicitacoes/get-solicitacao-by-id/${id}`);
    return returnFromApi.data;
  },
  saveDocument: async (values) => {
    let returnFromApi
    await api.post('/solicitacoes/save-documents', values).then((res) => {
      returnFromApi = res.data
    })
    return returnFromApi
  },
  getImage: async (values) => {
    let returnFromApi;
    await api.post(`/solicitacoes/get-image`,
      values, { responseType: 'blob' }).then(resposta => returnFromApi = resposta)
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
