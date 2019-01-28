import app from '../main'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '' : 'http://kuhe.io'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 400 ) {
        app.$router.replace({ path: '/login' })
      }
    }
    return Promise.reject(error)
  }
)

export default axios
