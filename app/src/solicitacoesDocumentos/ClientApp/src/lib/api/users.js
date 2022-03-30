import api from './api'

const UsersAPI = {
  allUsers: async (values) => {
    let returnFromApi
    await api.post('/users/all-users', values).then(res => {
      returnFromApi = res
    })
    return returnFromApi.data
  },
  saveUser: async (values) => {
    let returnFromApi
    await api.post('/users/new-user', values).then(response => {
      returnFromApi = response
    })
    return returnFromApi
  },
  updateUser: async (values) => {
    let returnFromApi
    await api.post('/update-user', values).then(response => {
      returnFromApi = response
    })
    return returnFromApi
  },
  getUserByID: async (id) => {
    const returnFromApi = await api.get(`/users/get-user-by-id/${id}`);
    return returnFromApi.data;
  },
  getPerfis: async () => {
    const returnFromApi = await api.get(`/users/get-perfis`);
    return returnFromApi.data.data;
  },
  getUserByEmail: async (email) => {
    const returnFromApi = await api.get(`/users/get-by-email/${email}`);
    return returnFromApi.data;
  },
  NewPassword: async (name, email) => {
    const returnFromApi = await api.get(`/users/new-password/${email}/${name}`);
    return returnFromApi.data;
  }
}

export default UsersAPI
