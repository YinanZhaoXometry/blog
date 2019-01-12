import app from '../main'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3030'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(error.response.status)
      if (error.response.status === 401) {
        app.$router.replace({
          path: '/login',
          query: { redirect: app.$router.currentRoute.fullPath }
        })
      }
    }
    return Promise.reject(error.response.data.error)
  }
)

export default axios
