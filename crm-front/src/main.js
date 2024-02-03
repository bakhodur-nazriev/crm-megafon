import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "@/store/store";
import http from "@/interceptors/http_api";
import './style.css';

createApp(App)
    .use(http)
    .use(store)
    .use(router)
    .mount('#app')
