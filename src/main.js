// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/index.scss'
import AV from 'leancloud-storage'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
const appId = 'Luwn37983MFGl7WXp5Pc5GfR-gzGzoHsz'
const appKey = 'SnC2PpwJR5qJu1HQedf0m8QC'
AV.init({ appId, appKey })
Vue.use(iView)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
