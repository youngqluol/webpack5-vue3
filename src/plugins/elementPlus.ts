import { ElButton } from 'element-plus';
// import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/el-button.css';

export default function installElementPlus(app) {
  app.config.globalProperties.$ELEMENT = {
    size: 'small',
    zIndex: 3000
  };
  app.use(ElButton);
}
