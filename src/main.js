import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/base.css";
import "./assets/css/style.css";
import VueLazyload from "vue-lazyload";

import loadImage from './assets/images/loader.gif'
import errorImage from './assets/images/default.png'

const app = createApp(App);

app.use(router);
app.use(VueLazyload, {
    preLoad: 1.3,
    error: errorImage,
    loading: loadImage,
    attempt: 1
})

app.mount("#app");