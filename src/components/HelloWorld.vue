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
  </div>
</template>

<script>
import ReadListManager from '../api/index.js'
import SingleRead from './SingleRead'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: []
    }
  },
  mounted () {
    this.getData().then(data => {
      this.list = data.data.list
    })
  },
  methods: {
    async getData () {
      let data = await ReadListManager.getMainlist()
      return data
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
