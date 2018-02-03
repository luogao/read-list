<template>
  <v-list two-line class="read-item">
    <v-divider></v-divider>
    <v-list-tile avatar :key="item.title" @click="">
      <v-list-tile-avatar>
        <img class="read-item-img" :src="item.img">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
        <v-list-tile-sub-title>{{ item.status?'已读':'未读' }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        
        <v-menu offset-y left>
          <v-btn icon ripple slot="activator">
            <v-icon color="grey lighten-1">more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in actions" :key="item.title" @click="">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>
<script>
export default {
  name: 'SingleRead',
  data () {
    return { 
      actions: [
        {title: 'action 1'},
        {title: 'action 2'},
        {title: 'action 3'}
      ]
    }
  },
  computed: {
    item () {
      return this.itemData
    }
  },
  props: {
    itemData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    console.log('hello')
  },
  methods: {}
}
</script>
<style lang="scss">
.read-item{
  &:hover{
    .read-item-img{
      filter: none;
      opacity: 1;
    }
  }
  &-img{
    transition: all 0.3s ease;
    filter: grayscale(100%);
    opacity: 0.66;
  }
}

</style>
