const axios = require('axios')

const token = localStorage.getItem('token') || ''

const api = axios.create({
  headers: {
    'access-token': token
  }
})

export default api
