import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
  FrappeUI,
} from 'frappe-ui'

let app = createApp(App)

let cartData = localStorage.getItem('cart')

if (!cartData) {
  const cartJSON = JSON.stringify({
    items: [],
  })
  localStorage.setItem('cart', cartJSON)
  cartData = {
    items: [],
  }
} else {
  cartData = JSON.parse(cartData)
}

const cart = reactive(cartData)

app.provide("cart", cart)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)
const options = {}
app.use(Toast,options)
app.mount('#app')
