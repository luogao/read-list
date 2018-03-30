<template>
  <div class="home">
    <ul class="readlist">
      <li v-for="item in list" :key="item.objectId" class="readlist-item">
        <single-read :item-data="item" @edit="handleReadEdit" @delete="handleReadDelete"/>
      </li>
    </ul>
    <Button type="primary" @click="openCreateModel">添加</Button>
      <Modal
        @on-visible-change="modelVisibleChange"
        v-model="createModel"
        title="新建"
        :mask-closable="!createNewTagLoading">
        <Form :model="formItem" :label-width="80" ref="createForm" label-position="left" :rules="ruleValidate">
          <FormItem label="链接" prop="link">
            <i-Input v-model="formItem.link" placeholder="请输入链接">
              <Button :loading="getInfoLoading" slot="append" @click="getLinkInfo" icon="ios-search"></Button>
            </i-Input>
          </FormItem>
          <FormItem label="标题" prop="read_title">
            <Input v-model="formItem.read_title"/>
          </FormItem>
          <FormItem label="标签" prop="readTags">
            <Row type="flex" justify="space-between">
                <template v-if="!createNewTag">
                  <i-Col span="21">
                    <Select v-model="formItem.readTags" multiple>
                      <Option :value="item.objectId" v-for=" item in tags" :key="item.objectId">{{item.name}}</Option>
                    </Select>
                  </i-Col>
                  <i-Col span="2">
                    <Button shape="circle" @click="createNewTag = true" icon="plus-round"></Button>
                  </i-Col>
                </template>
                <template v-else>
                  <i-Col span="19">
                    <Input v-model="newTag" placeholder="请输入标签名"/>
                  </i-Col>
                  <i-Col span="4">
                    <Button :loading="createNewTagLoading" shape="circle" @click="handleCreateNewTag" icon="checkmark-round"></Button>
                    <Button type="error" shape="circle" @click="cancelCreateTag" icon="close-round"></Button>
                  </i-Col>
                </template>
            </Row>
          </FormItem>
          <FormItem label="急需阅读" prop="isUrgent">
            <Checkbox v-model="formItem.isUrgent"></Checkbox>
          </FormItem>
          <FormItem label="阅读状态" prop="isRead">
            <i-switch v-model="formItem.isRead" size="large">
                <span slot="open">已读</span>
                <span slot="close">未读</span>
            </i-switch>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button :disabled="createModelLoading" @click="createModel = false">取消</Button>
          <Button :loading="createModelLoading" @click="createRead" type="primary">提交</Button>
        </div>
      </Modal>
      <Modal v-model="deleteConfirmModal" width="240" :mask-closable="!deleteConfirmModalLoading">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>此操作不可逆</p>
            <p>是否删除此项</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="deleteConfirmModalLoading" @click="confirmDelete">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import ReadListManager from '../api/index.js'
// import { bookmarksData } from '../api/bookmarks_data.js'
import SingleRead from '@/components/SingleRead'
export default {
  name: 'Home',
  data () {
    return {
      deleteConfirmModalLoading: false,
      deleteConfirmModal: false,
      createModel: false,
      getInfoLoading: false,
      createNewTagLoading: false,
      createNewTag: false,
      createModelLoading: false,
      curDeleteItem: '',
      list: [],
      tags: [],
      hostFullInfo: null,
      newTag: '',
      formItem: {
        link: '',
        readTags: [],
        read_title: '',
        isRead: false,
        isUrgent: false
      },
      ruleValidate: {
        link: [
          { required: true, message: '链接不能为空', trigger: 'blur' }
        ],
        read_title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  beforeMount () {
    this.getReadData().then(data => {
      this.list = data
    })
  },
  methods: {
    handleReadEdit (id) {
      console.log(id)
    },
    handleReadDelete (id) {
      this.deleteConfirmModal = true
      this.curDeleteItem = id
    },
    async confirmDelete () {
      this.deleteConfirmModalLoading = true
      await ReadListManager.readDelete(this.curDeleteItem)
      this.getReadData().then(data => {
        this.list = data
        this.deleteConfirmModalLoading = false
        this.$nextTick(() => { this.deleteConfirmModal = false })
      })
    },
    async getReadData () {
      const data = await ReadListManager.getReadByDefault()
      return data
    },
    openCreateModel () {
      this.getTagsData().then(this.createModel = true)
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.newTag = ''
      this.createNewTag = false
    },
    cancelCreateTag () {
      this.newTag = ''
      this.createNewTag = false
    },
    modelVisibleChange (status) {
      if (!status) {
        this.handleReset('createForm')
      }
    },
    async getLinkInfo () {
      const link = this.formItem.link
      if (link) {
        this.getInfoLoading = true
        const data = await ReadListManager.getLinkInfo(link)
        this.getInfoLoading = false
        this.hostFullInfo = data.data
        this.formItem.read_title = data.data.read_title
      }
    },
    async handleCreateNewTag () {
      if (this.newTag) {
        let newTag = {
          name: this.newTag
        }
        this.createNewTagLoading = true
        await ReadListManager.createTag(newTag)
        this.getTagsData().then(this.createNewTagLoading = false)
      }
    },
    async getTagsData () {
      const tagData = await ReadListManager.getTags()
      this.tags = tagData.map(el => {
        return {
          name: el.get('name'),
          objectId: el.get('objectId')
        }
      })
    },
    async createRead () {
      const isExist = await ReadListManager.readIsExist(this.formItem.link)
      if (isExist) {
        this.$Message.error('此链接已存在，请不要重复添加！')
      } else {
        this.createModelLoading = true
        await ReadListManager.createRead(this.formItem, this.hostFullInfo)
        this.getReadData().then(data => {
          this.list = data
          this.$nextTick(() => { this.createModel = false })
          this.createModelLoading = false
        })
      }
    }
  },
  components: {
    SingleRead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home{
  max-width: 720px;
  margin: 0 auto;
  h1, h2 {
    font-weight: normal;
  }
}
.readlist {
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    &-item {
      & + .readlist-item{
        margin-top: 10px;
      }
    }
  }

</style>
