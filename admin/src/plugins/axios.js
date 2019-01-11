import app from '../main'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3030'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  response => {
    if (response.data.status && response.data.status === 401) {
      return app.$router.replace({
        path: '/login',
        query: { redirect: app.$router.currentRoute.fullPath }
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
