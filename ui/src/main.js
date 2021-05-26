import '@/scss/main.scss'
import 'buefy/dist/buefy.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import axios from 'axios'

const defaultDocumentTitle = 'Dojnaz Coupons'

window.axios = axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.$router = router
window.$store = store
