import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import Buefy from 'buefy'
import AsyncComputed from 'vue-async-computed'

import('@/scss/main.scss')
import('buefy/dist/buefy.css')

const defaultDocumentTitle = 'Dojnaz Coupons'

window.axios = axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL
console.log(process.env)

router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)

  if (to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(AsyncComputed)

window.$store = store
window.$router = router

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

//window.$buefy = Buefy
