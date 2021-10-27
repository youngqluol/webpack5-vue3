import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import router from './router';
import store from './Store';
import App from './App.vue';
import 'element-plus/dist/index.css';
import './style/index.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);

app.mount('#app');
