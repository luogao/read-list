<template>
  <div class="hello">
    <ul>
      <template>
        <h2>未读</h2>
        <li v-for="item in list" :key="item.id" v-if="!item.status">
          <single-read :item-data="item"/>
        </li>
      </template>
      <template>
        <h2>已读</h2>
        <li v-for="item in list" :key="item.id" v-if="item.status">
          <single-read :item-data="item"/>
        </li>
      </template>
    </ul>
    <Button type="primary" @click="createModel = true">添加</Button>
      <Modal
        @on-visible-change="modelVisibleChange"
        v-model="createModel"
        title="新建"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formItem" :label-width="80" ref="createForm">
          <FormItem label="标题" v-if="formItem.read_title">
            <Input v-model="formItem.read_title"/>
          </FormItem>
          <FormItem label="链接">
            <Input v-model="formItem.link" placeholder="请输入链接">
              <Button :loading="getInfoLoading" slot="append" @click="getLinkInfo" icon="ios-search"></Button>
            </Input>
          </FormItem>
          <FormItem label="类型">
              <Select v-model="formItem.type">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
              </Select>
          </FormItem>
          <FormItem label="急需阅读">
            <Checkbox v-model="formItem.isUrgent"></Checkbox>
          </FormItem>
          <FormItem label="阅读状态">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">已读</span>
                <span slot="close">未读</span>
            </i-switch>
          </FormItem>
        </Form>
      </Modal>
  </div>
</template>

<script>
import ReadListManager from '../api/index.js'
import SingleRead from '@/components/SingleRead'
export default {
  name: 'Home',
  data () {
    return {
      createModel: false,
      list: [],
      getInfoLoading: false,
      linkFullInfo: null,
      formItem: {
        link: '',
        type: '',
        read_title: '',
        isRead: false,
        isUrgent: false
      }
    }
  },
  beforeMount () {},
  methods: {
    async getData (target) {
      // const data = await ReadListManager.getLinkInfo()
      // this.$set(this, target, data.data.list)
    },
    ok () {},
    cancel () {},
    async getLinkInfo () {
      const link = this.formItem.link
      if (link) {
        this.getInfoLoading = true
        const data = await ReadListManager.getLinkInfo(link)
        this.getInfoLoading = false
        this.linkFullInfo = data.data
        this.formItem.read_title = data.data.read_title
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    modelVisibleChange (status) {
      if (!status) {
        this.handleReset('createForm')
      }
    }
  },
  components: {
    SingleRead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  max-width: 660px;
  margin: 0 auto;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
li {
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>
