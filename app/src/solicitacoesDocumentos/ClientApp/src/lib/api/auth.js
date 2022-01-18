import api from './api'
import TokenAPI from './token'

const AuthAPI = {
  fakeAuth: async (values) => {
    const returnApi = {
      token: 'tokenFake'
    }

    const promisseReturn = new Promise((resolve) => {
      setTimeout(() => {
        console.log(values)
        resolve(returnApi)
      }, 1000)
    })

    return Promise.race([promisseReturn])
  },

  isAuth: async () => {
    const isAuth = await api.get('/auth/check')
    return isAuth
    // return true;
  },

  autenticate: async (values) => {
    // Should be implemented
    // Example:
    const returnFromApi = await api.post('/auth', values)

    if (returnFromApi.data.success === true) {
      const storage = {}
      storage.token = returnFromApi.data.data.token
      storage.id = returnFromApi.data.data.user.id
      storage.name = returnFromApi.data.data.user.name
      storage.login = returnFromApi.data.data.user.login
      storage.created_at = returnFromApi.data.data.user.created_at
      storage.image = returnFromApi.data.data.user.auth_image
      TokenAPI.setToken(storage)
    }
    return returnFromApi.data
  }
}

export default AuthAPI
