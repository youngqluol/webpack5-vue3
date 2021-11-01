import { createApp } from 'vue';
import router from './router';
import store from './Store';
import App from './App.vue';
import installElementPlus from './plugins/elementPlus';
import './style/reset.less';

const app = createApp(App);

app.use(router);
app.use(store);
installElementPlus(app);

app.mount('#app');
