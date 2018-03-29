import axios from 'axios'
import AV from 'leancloud-storage'

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
  createTag (tag) {
    const Tag = AV.Object.extend('Tag')
    const _tag = new Tag()
    _tag.set(tag)
    return _tag.save()
  }
  getTags () {
    const tagQuery = new AV.Query('Tag')
    return tagQuery.find()
  }
  createCategory (host) {
    let _host = {
      name: host.host_name,
      display_name: host.host_display_name,
      protocol: host.host_protocol,
      favicon: host.favicon === -1 ? '' : host.favicon
    }
    const Category = AV.Object.extend('Category')
    const _category = new Category()
    _category.set(_host)
    return _category.save()
  }
  createReadTagMap (tags, read) {
    return tags.map(el => {
      const _readTagMap = new AV.Object('ReadTagMap')
      _readTagMap.set('read', read)
      _readTagMap.set('tag', AV.Object.createWithoutData('Tag', el))
      return _readTagMap.save()
    })
  }
  async createRead (read, host) {
    const { readTags, ...readInfo } = read
    let { hostId, ...hostInfo } = host
    const Read = AV.Object.extend('Read')
    const _read = new Read()
    if (!hostId) {
      const newCategory = await this.createCategory(hostInfo)
      hostId = newCategory.get('objectId')
    }
    const _category = AV.Object.createWithoutData('Category', hostId)
    _read.set(readInfo)
    _read.set('_category', _category)
    const newRead = await _read.save()
    if (readTags.length > 0) {
      await this.createReadTagMap(readTags, newRead)
    }
    return newRead
  }
}

export default new ReadListManager()
