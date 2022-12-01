import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* IMPORT LIBRARY */
import VueLazyload from "vue-lazyload";
import ToastPlugin from 'vue-toast-notification';
import SmartTable from 'vuejs-smart-table'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

/* IMPORT STYLE */
import "./assets/css/base.css";
import "./assets/css/style.css";
import './assets/css/blobz.css'

/* IMPORT ASSETS */
import loadImage from './assets/images/loader.gif'
import errorImage from './assets/images/default.png'



const app = createApp(App);

app.use(VueLazyload, {
    preLoad: 1.3,
    error: errorImage,
    loading: loadImage,
    attempt: 1
})
app.use(ToastPlugin)
app.use(SmartTable)

app.use(router);

app.mount("#app");
