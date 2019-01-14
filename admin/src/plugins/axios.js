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
      if (error.response.status === 403) {
        console.log(app.$route)
        app.$router.replace({ path: '/login' })
      }
    }
    return Promise.reject(error.response.data.error)
  }
)

export default axios
