import axios from 'axios'

class ReadListManager {
  constructor () {
    this.$http = axios.create({
      baseURL: 'https://www.easy-mock.com/mock/5a743c2766c03869e556e214/list'
    })
  }
  getMainlist () {
    return this.$http.get('/')
  }
}

export default new ReadListManager()
