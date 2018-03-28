import axios from 'axios'

class ReadListManager {
  constructor () {
    this.$http = axios.create({
      baseURL: 'https://www.lglzy.cn/api'
    })
  }
  getMainlist () {
    return this.$http.get('/')
  }
  getLinkInfo (link) {
    return this.$http.post('/getinfo', { link })
  }
}

export default new ReadListManager()
