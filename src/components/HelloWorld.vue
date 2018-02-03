<template>
  <div class="hello">
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12 md12>
          <v-card>
            <template v-for="item in list">
              <single-read :item-data="item" :key="item.id"/>
            </template>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      console.log(this.list)
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
}
a {
  color: #42b983;
}
</style>
