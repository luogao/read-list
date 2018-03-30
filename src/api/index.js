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
    _read.set('tags', readTags)
    _read.set('_category', _category)
    return _read.save()
  }

  async getReadByDefault () {
    const readQuery = new AV.Query('Read')
    readQuery.include('_category')
    readQuery.include('tags')
    const results = await readQuery.find()
    let formatResult = []
    for (let el of results) {
      const tagP = el.get('tags').map(_tag => {
        const tagQuery = new AV.Query('Tag')
        return tagQuery.get(_tag).then(el => el.get('name'))
      })
      const formatTags = await Promise.all(tagP)
      let obj = {
        read_title: el.get('read_title'),
        link: el.get('link'),
        isRead: el.get('isRead'),
        isUrgent: el.get('isUrgent'),
        objectId: el.get('objectId'),
        tags: formatTags,
        host: {
          name: el.get('_category').get('display_name'),
          favicon: el.get('_category').get('favicon')
        }
      }
      formatResult.push(obj)
    }
    return formatResult
  }
}

export default new ReadListManager()
