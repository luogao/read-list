<template>
  <section class="block">
    <div class="block-img">
      <img :src="item.img" alt="" width="50" height="50">
    </div>
    <div class="block-info">
      <a :href="item.url"><p class="item-name">{{item.name}}</p></a>
      <div class="item-metainfo"></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SingleRead',
  data () {
    return { }
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
.block{
  border: 1px solid #000;
  overflow: hidden;
  &-img{
    border-radius: 50%;
    height: 50px;
    width: 50px;
    overflow: hidden;
    margin-right: 20px;
    float: left;
  }
  &-info{
    overflow: hidden;
    .item-name{
      margin: 0;
    }
  }
}
</style>
