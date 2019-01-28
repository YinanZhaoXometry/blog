import axios from '../plugins/axios'
import app from '../main'

export default {
   checkLogin () {
      return axios.get('/api/login')
        .then(()=>{
          return true
        })
        .catch((err)=>{
          console.log(err)
          return false
        })
  }
}
