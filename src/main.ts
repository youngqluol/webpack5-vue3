import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import installElementPlus from './plugins/elementPlus';
import './style/reset.less';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
installElementPlus(app);

app.mount('#app');
