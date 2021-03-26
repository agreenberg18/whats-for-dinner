import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Emitter from 'tiny-emitter'
//import mitt from 'mitt';
var emitter = new Emitter()

// const emitter = mitt();
// const app = createApp(App);
// app.config.globalProperties.emitter = emitter;

createApp(App).use(store).use(router).mount('#app')
