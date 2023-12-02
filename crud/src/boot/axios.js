import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

//const api = axios.create({ baseURL: process.env.API_URL })
const dummy = axios.create({ baseURL: 'https://dummyjson.com' })
Vue.prototype.$dummy = dummy
export { axios,  dummy}