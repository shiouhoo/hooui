// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Antd);
  }
}