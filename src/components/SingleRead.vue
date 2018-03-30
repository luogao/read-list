<template>
  <section class="block">
    <div class="block-img">
      <img :src="item.host.favicon" alt="" width="50" height="50">
    </div>
    <div class="block-info">
      <a :href="item.link">
        <p class="item-name">{{item.read_title}}</p>
      </a>
      <div class="item-metainfo">
        <span>{{item.isRead? '已读' : '未读'}}</span>
        <span v-if="item.isUrgent">紧急</span>
        <Tag type="border" color="blue" v-if="item.tags.length > 0" v-for="tag in item.tags" :key="tag">{{tag}}</Tag>
      </div>
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
    console.log(this.item)
  },
  methods: {}
}
</script>
<style lang="scss">
.block{
  overflow: hidden;
  background: #fff;
  padding: 15px;
  &-img{
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
      font-size: 18px;
      font-weight: 100;
    }
  }
}
</style>
