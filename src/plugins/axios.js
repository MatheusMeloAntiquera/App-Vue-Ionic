import Vue from 'vue';
import axios from  'axios';

Vue.use({
    install(Vue){
        Vue.prototype.$tasks = axios.create({
            baseURL: 'http://localhost:3000/tasks'
        })
    }
})