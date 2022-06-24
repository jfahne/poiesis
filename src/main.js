import './assets/styles/styles.scss'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import VueWriter from "vue-writer";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'

library.add(faMoon)
library.add(faSun)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(VueWriter).mount('#app')

