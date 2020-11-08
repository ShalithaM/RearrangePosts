import Vue from 'vue'
import App from './App.vue'

//Store
import store from './store'

// import tailwindcss files
import "./assets/tailwind.css";


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
