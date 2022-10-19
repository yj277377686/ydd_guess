import Vue from 'vue'
import App from './App'
import store from './store'
import music from './utils/music.js'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.music =music;

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
